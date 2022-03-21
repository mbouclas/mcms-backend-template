(function () {
    angular.module('mcms.settingsManager')
        .directive('renderSettings', Directive);

    Directive.$inject = ['configuration', 'lodashFactory'];
    DirectiveController.$inject = ['$scope', 'mcms.settingsManagerService', 'lodashFactory',
        '$timeout', 'LangService', 'momentFactory', 'configuration'];

    function Directive(Config, lo) {

        return {
            require: ['ngModel', 'renderSettings', '^form'],
            templateUrl: Config.templatesDir + "SettingsManager/renderSettings.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            scope: {
                options: '=?options',
                items: '=items',
                model: '=ngModel'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {};
                scope.Form = controllers[2];

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);


                var unregister = scope.$watch('items', function (val) {
                    if (!val) {
                        return;
                    }

                    if (lo.isArray(scope.model) || typeof scope.model == 'undefined' || !scope.model) {
                        scope.model = {};
                    }
                    controllers[1].assignItems(scope.items, scope.model);

                    // unregister();
                }, true);

            }
        };
    }

    function DirectiveController($scope, Settings, lo, $timeout, Lang, moment, Config) {
        var vm = this;
        vm.ValidationMessagesTemplate = Config.validationMessages;

        vm.Items = [];
        vm.models = {};
        vm.imageOptions = {
            showPreview: false,
            showDetails: false,
            showUpload: true
        };
        vm.fileOptions = {
            passThrough : true,
        };
        vm.defaultLang = Lang.defaultLang();
        vm.Locales = Lang.locales();

        vm.assignItems = function (items, ngModel) {

            if (lo.isArray(items)) {
                //direct assignment
                vm.Items = items;
            } else if (lo.isObject(items)) {
                //search first
                vm.Items = Settings.get(items);
            }

            //now merge items with the given ngModel

            fillValues(ngModel);
        };

        function fillValues(ngModel) {
            var value = '';
            vm.Items.forEach(function (field) {
//this entire method needs to be extracted to individual methods in a master class. Eache method serves a type
                //It's fine for now, but not all that future proof
                if (typeof ngModel[field.varName] == 'undefined') {
                    switch (field.type) {
                        case 'boolean' :
                            value = (field.default) ? field.default : false;
                            break;
                        case 'number' :
                            value = (field.default) ? field.default : 0;
                            break;
                        case 'email' :
                            value = (field.default) ? field.default : '';
                            break;
                        case 'date' :
                            value = new Date();
                            break;
                        case 'selectMultiple' :
                            value = [];
                            break;
                        case 'image' :
                            value = {};
                            break;
                        case 'file' :
                            value = {};
                            break;
                        case 'itemSelector' :
                            value = (typeof field.config !== 'undefined' && field.config.multiple) ? [] : {};
                            break;
                        default :
                            value = (field.translatable) ? Lang.langFields() : '';
                    }

                    ngModel[field.varName] = value;

                    if (field.type === 'select') {
                        var defaultValue = lo.find(field.options, {default: true});
                        if (defaultValue) {
                            ngModel[field.varName] = defaultValue.value;
                        }
                    }

                    if (field.type === 'text') {
                        if (!field.translatable) {
                            ngModel[field.varName] = field.default;
                        }
                        else {
                            for (var i in ngModel[field.varName]) {
                                ngModel[field.varName][i] = field.default;
                            }
                        }
                    }

                }

                if (field.type === 'date' && typeof ngModel[field.varName] === 'string') {
                    ngModel[field.varName] = moment(ngModel[field.varName]).toDate();
                }

                if (field.type === 'itemSelector') {
                    if (!field.config.multiple && lo.isArray(ngModel[field.varName])) {
                        ngModel[field.varName] = {};//fixes the fact tha php converts empty object to []
                    }
                }

                if (field.type === 'file' || field.type === 'image') {
                    if (field.type === 'image' && lo.isObject(field.settings)) {
                        field.settings = angular.extend(vm.imageOptions, field.settings);
                    }

                    if (field.type === 'file' && lo.isObject(field.settings)) {
                        field.settings = angular.extend(vm.fileOptions, field.settings);
                    }

                    if (typeof ngModel[field.varName] === 'undefined' || lo.isArray(ngModel[field.varName])){
                        ngModel[field.varName] = {};
                    }
                }

                if (field.type === 'boolean') {
                    if (lo.isNumber(ngModel[field.varName])) {
                        ngModel[field.varName] = (ngModel[field.varName] === 1) ? true : false;
                    }
                }

                vm.models[field.varName] = ngModel[field.varName];
            });

        }

        vm.changed = function (field, value) {
            $timeout(function () {
                if (typeof field == 'string') {
                    $scope.model[field] = (typeof value != 'undefined') ? value : vm.models[field];
                }
                else if (lo.isObject(field)) {
                    if (field.type == 'itemSelector' && lo.isArray($scope.model[field.varName])) {
                        $scope.model[field.varName].push(value);
                    }
                    else if (field.type == 'itemSelector' && lo.isObject($scope.model[field.varName])) {
                        $scope.model[field.varName] = value;
                    }
                    else {
                        $scope.model[field.varName] = vm.models[field.varName];
                    }
                }
            });
        }
    }
})();
