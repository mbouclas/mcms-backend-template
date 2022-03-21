(function () {
    angular.module('mcms.settingsManager')
        .directive('editSettingsField', Directive);

    Directive.$inject = ['configuration', 'lodashFactory'];
    DirectiveController.$inject = ['$scope', 'mcms.settingsManagerService', 'lodashFactory','$timeout',
        'configuration', 'LangService'];

    function Directive(Config, lo) {

        return {
            require : ['ngModel','editSettingsField'],
            templateUrl: Config.templatesDir + "SettingsManager/editSettingsField.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            scope: {
                options: '=?options',
                model : '=ngModel',
                onSave : '&?onSave'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {

                };

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);

                controllers[1].init(scope.model);


            }
        };
    }

    function DirectiveController($scope, Settings, lo, $timeout, Config, Lang) {
        var vm = this;
        vm.Model = {};
        vm.ValidationMessagesTemplate = Config.validationMessages;
        vm.Lang = Lang;
        vm.defaultLang = Lang.defaultLang();
        vm.Locales = Lang.locales();

        vm.imageOptions = {
            showPreview: false,
            showDetails: false,
            showUpload: true
        };
        vm.fileOptions = {
            passThrough : true,
        };

        vm.init = function (model) {
            vm.Model = model;
        }

        vm.save = function () {
            if (typeof $scope.onSave == 'function'){
                $scope.onSave({field : Settings.cleanUpFieldModel(vm.Model)});
            }
        };

        vm.addOption = function (array, template) {
            var tmp = angular.copy(template);
            for (var i in tmp){
                tmp[i].randomId = Settings.randomId(tmp[i].type);
                if (typeof tmp[i].multilingual != 'undefined' && tmp[i].multilingual){
                    tmp[i].value = Lang.langFields();
                }
            }

            array.push(tmp);
        };

        vm.deleteOption = function (array, $index) {
            array.splice($index, 1);
        };

        vm.checkUnique = function (field, name, arrayOfItems) {
            if (typeof field.unique != 'undefined' && field.unique){
                //reset all keys
                Settings.ensureUniqueBoolean(field, name, arrayOfItems);
            }
        };

        vm.isObject= function(item){
            return lo.isObject(item);
        };

        vm.uploadDone = function (field, value, passThrough) {
            passThrough.value = value;
            vm.checkUnique(passThrough, passThrough.varName);
        };
    }
})();
