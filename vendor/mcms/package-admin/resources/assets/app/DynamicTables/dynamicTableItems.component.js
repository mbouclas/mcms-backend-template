(function () {
    angular.module('mcms.dynamicTables')
        .directive('dynamicTableItems', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'core.services', 'configuration', 'AuthService',
        'LangService', 'DynamicTableService'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "DynamicTables/dynamicTableItems.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['dynamicTableItems'],
            scope: {
                options: '=?options',
                onSave: '&?onSave',
                items : '=?items'
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

    function DirectiveController($scope, Helpers, Config, ACL, Lang, DynamicTableService) {
        var vm = this;
        vm.Lang = Lang;
        vm.Table = {};
        vm.Items = [];
        vm.defaultLang = Lang.defaultLang();
        vm.Locales = Lang.locales();

        vm.init = function () {
            vm.Items = $scope.items.items;
            vm.Table = $scope.items.table;
            vm.module = DynamicTableService.mapModelByVal(vm.Table.model);
        };

        vm.delete = function (node) {
            Helpers.confirmDialog({}, {})
                .then(function () {
                    DynamicTableService.destroy(node)
                        .then(function () {
                            DynamicTableService.get(vm.Table.id)
                                .then(function (response) {
                                    vm.Items = response.items;
                                    Helpers.toast('Saved!');
                                })
                        });
                });
        };

        vm.save = function () {
            DynamicTableService.rebuild(vm.Table.id, vm.Items)
                .then(function () {
                    Helpers.toast('Saved!');
                });
        }

    }
})();
