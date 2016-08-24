(function () {
    angular.module('mcms.settingsManager')
        .directive('renderSettings', Directive);

    Directive.$inject = ['configuration', 'lodashFactory'];
    DirectiveController.$inject = ['$scope', 'mcms.settingsManagerService', 'lodashFactory','$timeout', 'LangService'];

    function Directive(Config, lo) {

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

                };

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);


                var unregister = scope.$watch('items',function (val) {
                    if (!val){
                        return;
                    }

                    if (lo.isArray(scope.model) || typeof scope.model == 'undefined' || !scope.model){
                        scope.model = {};
                    }
                    controllers[1].assignItems(scope.items,scope.model);

                    // unregister();
                },true);

            }
        };
    }

    function DirectiveController($scope, Settings, lo, $timeout, Lang) {
        var vm = this;
        vm.Items = [];
        vm.models = {};
        vm.imageOptions = {
            showPreview : false,
            showDetails : false,
            showUpload : true
        };
        vm.defaultLang = Lang.defaultLang();
        vm.Locales = Lang.locales();

        vm.assignItems = function(items,ngModel){

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
            var value = '';

            vm.Items.forEach(function (field) {
                if (typeof ngModel[field.varName] == 'undefined') {
                    switch (field.type){
                        case 'boolean' : value = false;
                            break;
                        case 'selectMultiple' : value = [];
                            break;
                        case 'image' : value = {};
                            break;
                        case 'file' : value = {};
                            break;
                        default : value = (field.translatable) ? Lang.langFields() :  '';
                    }

                    ngModel[field.varName] = value;
                }
                vm.models[field.varName] = ngModel[field.varName];
            });

        }

        vm.changed = function (field, value) {
            $timeout(function () {
                $scope.model[field] = (typeof value != 'undefined') ? value : vm.models[field];
            });
        }
    }
})();
