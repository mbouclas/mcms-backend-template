(function () {
    angular.module('mcms.settingsManager')
        .directive('renderSettings', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'mcms.settingsManagerService', 'lodashFactory','$timeout'];

    function Directive(Config) {

        return {
            require : ['ngModel','renderSettings'],
            templateUrl: Config.templatesDir + "SettingsManager/renderSettings.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            scope: {
                options: '=?options',
                items: '=items',
                model : '=ngModel'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    limit: 10
                };

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
                controllers[1].assignItems(scope.items,scope.model);
/*                scope.$watch('items',function (val) {
                    if (!val){
                        return;
                    }
                    controllers[1].assignItems(scope.items,scope.model);
                    // unregister();
                },true);*/

            }
        };
    }

    function DirectiveController($scope, Settings, lo, $timeout) {
        var vm = this;
        vm.Items = [];


        vm.assignItems = function(items,ngModel){
            console.log('running');
            if (lo.isArray(items)){
                //direct assignment
                vm.Items = items;
            } else if (lo.isObject(items)){
                //search first
                vm.Items = Settings.get(items);
            }

            //now merge items with the given ngModel
            fillValues(ngModel);




        };

        function fillValues(ngModel) {
            var values = [];

            vm.Items.forEach(function (field) {

                var found = null;
                if (typeof ngModel[field.varName] != 'undefined') {
                    console.log('found ', ngModel[field.varName])
                    field.value = ngModel[field.varName];
                }

                if (!found){
                    var newField = angular.copy(field);
                    if (field.type == 'boolean'){
                        newField.value = false;
                    } else {
                        newField.value = '';
                    }

                    ngModel[field.varName] = newField.value;
                    field.value = ngModel[field.varName];
                    values.push(newField);

                    return;
                }

                values.push(found);
            });

            return values;
        }

        vm.changed = function (field) {
            $timeout(function () {
                $scope.model[field.varName] = field.value;
            });
        }
    }
})();
