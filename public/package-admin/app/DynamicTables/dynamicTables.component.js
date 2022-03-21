(function () {
    angular.module('mcms.dynamicTables')
        .directive('dynamicTables', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'core.services', 'configuration', 'AuthService',
        'LangService', 'DynamicTableService', 'BottomSheet', 'Dialog', '$location', '$filter'];

    function Directive(Config) {
        return {
            templateUrl: Config.templatesDir + "DynamicTables/dynamicTables.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['dynamicTables'],
            scope: {
                options: '=?options',
                onSave: '&?onSave',
                modelName : '=modelName',
                route : '=route'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true
                };


                controllers[0].init();
                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);

            }
        };
    }

    function DirectiveController($scope, Helpers, Config, ACL, Lang, DynamicTableService,
                                 BottomSheet, Dialog, $location, $filter) {
        var vm = this;
        vm.Tables = [];
        vm.Lang = Lang;
        vm.defaultLang = Lang.defaultLang();
        vm.Locales = Lang.locales();

        vm.init = function () {
          //Grab tables from the service
            vm.module = DynamicTableService.mapModelByVal($scope.modelName);

            DynamicTableService.getTables($scope.modelName)
                .then(function (result) {
                    vm.Tables = result.tables;
                });
        };

        vm.showActions = function (ev, item) {
            BottomSheet.show({
                item : item,
                title : 'Edit ' + item.title[vm.defaultLang]
            },[
                { name: 'Edit', icon: 'edit', fn : vm.edit },
                { name: 'Edit Items', icon: 'menu', fn : vm.editItems },
                { name: 'Delete', icon: 'delete', fn : vm.delete },
            ]);
        };

        vm.edit = function (item) {
            var id = (!item) ? $scope.modelName : item.id;

            $location.path($filter('reverseUrl')('dynamic-table-edit',{id : id}).replace('#',''));
        };

        vm.onSave = function (item, isNew) {
            if (isNew){
                return;
            }

            vm.Tables.push(item);
            Dialog.close();
        };

        vm.editItems = function (item) {
            $location.path($filter('reverseUrl')($scope.route,{id : item.id}).replace('#',''));
        };

        vm.delete = function (item) {
            Helpers.confirmDialog({}, {})
                .then(function () {
                    DynamicTableService.destroy(item)
                        .then(function (response) {
                            vm.Tables = response.tables;
                            Helpers.toast('Deleted');
                        });
                });
        };
    }
})();
