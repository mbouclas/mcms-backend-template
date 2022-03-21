(function () {
    angular.module('mcms.mediaLibrary')
        .directive('mediaLibraryEditor', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'MediaLibraryService', 'core.services', 'lodashFactory',
        '$mdSidenav', 'Dialog', '$timeout', 'configuration'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "MediaLibrary/mediaLibraryEditor.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['mediaLibraryEditor'],
            scope: {
                options: '=?options',
                toggleFilters : '=?toggleFilters',
                filters : '=?filters',
                onSelect: '&?onSelect',
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    limit : 50
                };

                scope.options = (typeof scope.options == 'undefined' || !scope.options) ? defaults : angular.extend(defaults, scope.options);

            }
        };
    }

    function DirectiveController($scope, MLS, Helpers, lo, $mdSidenav, Dialog, $timeout, Config) {
        var vm = this,
            DZ = {},
            filters = {
                page : 1,
                tag : [],
                collection_name : 'images'
            };
        vm.Items = [];
        vm.Pagination = {};
        vm.Filters = angular.extend(filters, $scope.filters);
        vm.tagOptions = {tags : MLS.tags()};
        $scope.showFilters = false;


        vm.dzInstance = function (instance) {
            DZ = instance;
        };
        vm.Callbacks = {
            success : function (file, xhr) {
                vm.Items.unshift(xhr);
            }
        };

        vm.UploadConfig = {
            url : Config.mediaLibrary.imageUploadUrl,
            acceptSelect : Config.fileTypes.image.acceptSelect,
            params : {
                disk : 'media'
            },
            uploadOptions : Config.fileTypes.image.uploadOptions
        };

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
            $scope.showFilters =  !$scope.showFilters;
        };

        vm.set = function (item) {
            if (typeof $scope.onSelect == 'function'){
                $scope.onSelect({item : item});
            }
        };

        vm.toggleUploadBox = function () {
            $scope.showUploadBox = !$scope.showUploadBox;
        };

        vm.toggleFilters = function () {
            $mdSidenav('filters').toggle();
        };

        vm.edit = function (item) {
            Dialog.show({
                title : item.name || item.file_name,
                contents : '<edit-media-library-item ng-model="VM.Item" on-save="VM.onSave(item)" on-delete="VM.onDelete(item)"></edit-media-library-item>',
                locals : {
                    Item :item.id,
                    onSave : vm.onSaveItem,
                    onDelete : vm.onDeleteItem,
                }
            });
        };

        vm.onSaveItem = function (item) {
            var index = lo.findIndex(vm.Items, {id : item.id});
            if (index == -1){
                return;
            }


            vm.Items[index].name = item.name;
            vm.Items[index].tagged = item.tagged;

        };

        vm.onDeleteItem = function (item) {
            var index = lo.findIndex(vm.Items, {id : item.id});
            if (index == -1){
                return;
            }


            vm.Items.splice(index, 1);

        };
    }
})();
