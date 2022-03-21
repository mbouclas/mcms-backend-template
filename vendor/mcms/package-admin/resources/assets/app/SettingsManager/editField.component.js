(function () {
    angular.module('mcms.settingsManager')
        .directive('editField', Directive);

    Directive.$inject = ['configuration', 'lodashFactory'];
    DirectiveController.$inject = ['$scope', 'LangService', 'core.services'];

    function Directive(Config, lo) {

        return {
            require : ['editField'],
            templateUrl: Config.templatesDir + "SettingsManager/editField.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            scope: {
                options: '=?options',
                field : '=field',
                onSave : '&?onSave'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {

                };

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
                controllers[0].init(scope.model);
            }
        };
    }

    function DirectiveController($scope, Lang, Helpers) {
        var vm = this;
        vm.Lang = Lang;
        vm.defaultLang = Lang.defaultLang();
        vm.Locales = Lang.locales();

        vm.init = function (model) {
            vm.defaultOptions = {
                defaultModel : {
                    model : model
                }
            };

            vm.Model = model;
            ExtraFieldService.get({model : model})
                .then(function (response) {
                    vm.Fields = response.fields;
                    //response.customizations is coming from config (e.g pages.items.extraFields)
                    if (!lo.isArray($scope.additionalFields)){
                        $scope.additionalFields = [];
                    }
                    $scope.additionalFields = $scope.additionalFields.concat(response.customizations);
                });
        }

        vm.save = function () {
            if (typeof $scope.onSave == 'function'){
                $scope.onSave({fields : vm.Fields});
            }
        };

        vm.onSave = function (field, allFields, editedModel) {

            if (typeof editedModel == 'undefined'){
                editedModel = {
                    model : $scope.model,
                    id : null,
                    varName : field.params.varName.value,
                    label : field.params.label.value,
                    type : field.type
                }
            }

            ExtraFieldService.save(ExtraFieldService.convertToMysqlFormat(field, editedModel), editedModel.id)
                .then(function (newField) {
                    vm.Fields = [];
                    vm.init($scope.model);
                    Helpers.toast('Saved!!!');
                });
        };

        vm.onDelete = function (field, $index, allFields) {
            return Helpers.confirmDialog({}, {})
                .then(function () {
                    ExtraFieldService.destroy(field)
                        .then(Helpers.toast('Saved!!!'));
                });
        };

    }
})();
