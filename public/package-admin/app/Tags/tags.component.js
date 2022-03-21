(function () {
    angular.module('mcms.tags')
        .directive('tags', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'TagsService', 'core.services', 'lodashFactory'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "Tags/tags.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['tags', 'ngModel'],
            scope: {
                model: '=?ngModel',
                options: '=?options',
                onSave: '&?onSave',
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    autocompleteRequireMatch: false
                };

                var watcher = scope.$watch('model', function (val) {
                    if (val){
                        controllers[0].init(val);
                        watcher();
                    }
                });

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
            }
        };
    }

    function DirectiveController($scope, Tags, Helpers, lo) {
        var vm = this;
        vm.Model = [];
        vm.Tags = Tags.get();
        vm.searchText = '';
        vm.selectedItem = null;

        vm.init = function (model) {
            vm.Model = (lo.isArray(model)) ? model : [];

            if (typeof $scope.options.tags != 'undefined' && typeof $scope.options.tags == 'object'){
                $scope.options.tags.then(function (tags) {
                    vm.Tags = tags;
                });
            }

            Tags.normalize(model);
        };

        vm.querySearch = function (query) {
            return (!query) ? vm.Tags : vm.Tags.filter(Helpers.createFilterFor('name',query));
        };


        vm.transformChip = function(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }

            // Otherwise, create a new one
            return { name: chip };
        }
    }
})();
