(function () {
    angular.module('mcms.dynamicTables')
        .directive('editDynamicTable', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'core.services', 'configuration', 'AuthService',
        'LangService', 'DynamicTableService', 'lodashFactory', '$location', '$filter'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "DynamicTables/editDynamicTable.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['editDynamicTable', 'ngModel'],
            scope: {
                options: '=?options',
                onSave: '&?onSave',
                model : '=ngModel',
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

    function DirectiveController($scope, Helpers, Config, ACL, Lang, DynamicTableService, lo, $location, $filter) {
        var vm = this;
        vm.Lang = Lang;
        vm.defaultLang = Lang.defaultLang();
        vm.Locales = Lang.locales();
        vm.ValidationMessagesTemplate = Config.validationMessages;
        vm.Table = {};

        vm.init = function () {

            if (typeof $scope.model.settings == 'undefined' || lo.isArray($scope.model.settings)){
                $scope.model.settings = {};
            }

            if (typeof $scope.model.meta == 'undefined' || !$scope.model.meta || lo.isArray($scope.model.meta)){
                $scope.model.meta = {
                    fields : []
                };
            }

            if (typeof $scope.model.settings.extraFields == 'undefined'){
                $scope.model.settings.extraFields = [];
            }

            vm.Table = $scope.model;
            vm.module = DynamicTableService.mapModelByVal(vm.Table.model);
        };


        vm.save = function () {
            DynamicTableService.save(vm.Table)
                .then(function (response) {
                    Helpers.toast('Saved!');
                    var isNew = (typeof vm.Table.id === 'undefined' || !vm.Table.id);
                    if (isNew){
                        $location.path($filter('reverseUrl')('dynamic-table-edit',{id : response.id}).replace('#',''));
                        return;
                    }

                    if (typeof $scope.onSave == 'function'){
                        $scope.onSave({item : response, isNew : isNew});
                    }
                });
        };

    }
})();
