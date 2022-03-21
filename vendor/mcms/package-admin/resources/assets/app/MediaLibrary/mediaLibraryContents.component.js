(function () {
    angular.module('mcms.mediaLibrary')
        .directive('mediaLibraryContents', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'MediaLibraryService', 'core.services', 'lodashFactory'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "MediaLibrary/mediaLibraryContents.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require: ['mediaLibraryContents'],
            scope: {
                options: '=?options',
                filters: '=?filters',
                toggleFilters: '=?toggleFilters',
                onSelect: '&?onSelect',
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                        limit: 50
                    };

                scope.options = (typeof scope.options == 'undefined' || !scope.options) ? defaults : angular.extend(defaults, scope.options);

            }
        };
    }

    function DirectiveController($scope, MLS, Helpers, lo) {
        var vm = this,
            filters = {
                page : 1,
                tag : [],
                collection_name : 'images'
            };
        vm.Items = [];
        vm.Pagination = {};
        vm.Filters = angular.extend(filters, $scope.filters);
        vm.tagOptions = {tags: MLS.tags()};
        $scope.showFilters = false;

        vm.filter = function () {
            vm.Items = [];
            MLS.get(optimizeFilters())
                .then(function (items) {
                    vm.Items = items.items;
                    vm.Pagination = items.pagination;
                });
        };

        vm.changePage = function (page) {
            vm.Filters.page = page;
            vm.filter();
        };

        vm.filter();

        function optimizeFilters() {
            var ret = angular.copy(vm.Filters);
            ret.tag = lo.map(vm.Filters.tag, function (item) {
                return item.slug;
            }).join(',');

            return ret;
        }

        vm.toggleFilters = function () {
            $scope.showFilters = !$scope.showFilters;
        };

        vm.set = function (item) {
            if (typeof $scope.onSelect == 'function') {
                $scope.onSelect({item: item});
            }
        };

    }
})();
