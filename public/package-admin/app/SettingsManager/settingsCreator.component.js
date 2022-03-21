(function () {
    angular.module('mcms.settingsManager')
        .directive('settingsCreator', Directive);

    Directive.$inject = ['configuration', 'lodashFactory'];
    DirectiveController.$inject = ['$scope', 'mcms.settingsManagerService',
        'lodashFactory','LangService', 'Dialog'];

    function Directive(Config, lo) {

        return {
            require : ['ngModel','settingsCreator'],
            templateUrl: Config.templatesDir + "SettingsManager/settingsCreator.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            scope: {
                options: '=?options',
                items: '=items',
                model : '=ngModel',
                components : '=?components',
                injectToFields : '=?injectToFields',
                onSave : '&?onSave',
                onDelete : '&?onDelete',//must be a promise
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    preview : false
                };


                scope.$watch('model' ,function(val) {
                    if (!lo.isArray(val)) {
                        return;
                    }
                    scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
                    controllers[1].init(scope.model);
                });
            }
        };
    }

    function DirectiveController($scope, Settings, lo, Lang, Dialog) {
        var vm = this,
            nowEditing = null,
            OriginalModel = [];
        vm.Model = [];
        vm.Components = Settings.components();
        vm.newField = null;
        vm.Lang = Lang;
        vm.defaultLang = Lang.defaultLang();
        vm.Locales = Lang.locales();

        vm.init = function (model) {
            vm.Model = (typeof model == 'undefined' || !lo.isArray(model)) ? [] : model;
            if (typeof $scope.components != 'undefined'){
                vm.Components = $scope.components;
                Settings.setComponents(vm.Components);
            }

            if (lo.isArray($scope.injectToFields)){
                //we need to add this properties to the fields
                lo.forEach(vm.Components, function (component) {
                    for (var i in $scope.injectToFields){
                        component.params[$scope.injectToFields[i].varName] = $scope.injectToFields[i];
                    }
                });
            }


            OriginalModel = angular.copy(vm.Model);
        }

        vm.add = function () {
            //open modal
            vm.NewModel = Settings.addField(vm.newField);
            vm.NewModel.isNew = true;
            Dialog.show({
                title : 'New Field',
                contents : '<edit-settings-field ' +
                'ng-model="VM.field" on-save="VM.onSave(field)"></edit-settings-field>',
                locals : {
                    field : vm.NewModel,
                    onSave : vm.onSave
                }
            });
        };

        vm.edit = function (model, $index) {
            //open modal...
            //reverse the model
            vm.NewModel = Settings.reverseFieldToEditable(model);
            vm.NewModel.isNew = false;
            nowEditing = $index;//keep the index to replace on save as we get a different model

            Dialog.show({
                title : 'Edit ' + model.label[vm.defaultLang],
                contents : '<edit-settings-field ' +
                'ng-model="VM.field" on-save="VM.onSave(field)"></edit-settings-field>',
                locals : {
                    field : vm.NewModel,
                    onSave : vm.onSave
                }
            });

        }

        vm.onSave = function (field) {
            var editedModel;
            if (field.isNew) {
                var newModel = Settings.convertFieldToSchema(field.params, field.type);

                if (typeof field.settings != 'undefined'){
                    newModel.settings = Settings.convertFieldToSchema(field.settings, field.type);
                }

                if (typeof field.config != 'undefined'){
                    newModel.config = Settings.convertFieldToSchema(field.config, field.type);
                }
                vm.Model.push(newModel);
                console.log(vm.Model);
                editedModel = OriginalModel[vm.Model.length-1];
            }

            if (lo.isNumber(nowEditing)){
                vm.Model[nowEditing] = Settings.convertFieldToSchema(field.params, field.type);//replace old with new model
                if (typeof field.settings != 'undefined'){
                    vm.Model[nowEditing].settings = Settings.convertFieldToSchema(field.settings, field.type);
                }

                if (typeof field.config != 'undefined'){
                    vm.Model[nowEditing].config = Settings.convertFieldToSchema(field.config, field.type);
                }

                editedModel = OriginalModel[nowEditing];
            }

            if (typeof $scope.onSave == 'function'){
                $scope.onSave({field : field, allFields : vm.Model, editedModel : editedModel});
            }

            nowEditing = null;//reset
            editedModel = {};
            vm.showAdd = false;
            Dialog.close();
        };

        vm.delete = function ($index) {
            if (typeof $scope.onDelete == 'function'){
                //must be a promise
                $scope.onDelete({field : vm.Model[$index], $index : $index, allFields : vm.Model})
                    .then(function (result) {
                        vm.Model.splice($index, 1);
                    });
                return;
            }
            vm.Model.splice($index, 1);
        };

        vm.save = function () {

        };

        vm.cancel = function () {
            vm.showAdd = false;
        };

        vm.togglePreview = function () {
            $scope.preview = !$scope.preview;
        };

        vm.isString = function(item){
            return typeof item == 'string';
        };
    }
})();
