(function () {
    angular.module('mcms.mediaFiles')
        .directive('editImage', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'core.services', 'configuration', 'AuthService',
        'LangService', 'mediaFileService'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "MediaFiles/editImage.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['editImage', 'ngModel'],
            scope: {
                options: '=?options',
                onSave: '&?onSave',
                ngModel: '=ngModel'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true
                };

                controllers[0].init(scope.ngModel);
                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);

            }
        };
    }

    function DirectiveController($scope, Helpers, Config, ACL, Lang, Media) {
        var vm = this;
        vm.Item = {};
        vm.Lang = Lang;
        vm.defaultLang = Lang.defaultLang();
        vm.Locales = Lang.locales();

        vm.init = function (item) {
            vm.Item = item;
        };

        vm.save = function () {
            Media.saveImage(vm.Item)
                .then(function () {
                    Helpers.toast('Saved!');
                });
        }
    }
})();
