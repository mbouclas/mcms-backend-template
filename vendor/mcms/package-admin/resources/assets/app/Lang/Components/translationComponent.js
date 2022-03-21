(function () {
    angular.module('mcms.lang')
        .directive('translationComponent', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'LangService','core.services'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "Lang/Components/translation.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['translationComponent'],
            scope: {
                options: '=?options',
                item: '=?item',
                action : '=?action',
                onSave: '&?onSave'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true
                };

                scope.action = scope.action || 'update';
                controllers[0].set(scope.item);
                scope.redactorConfig = Config.redactor;
                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
            }
        };
    }

    function DirectiveController($scope, Lang, Helpers) {
        var vm = this;
        vm.Item = {};
        vm.groups = Lang.groups();
        vm.locales = Lang.locales();

        vm.set = function (item) {
            vm.Item = Lang.normalizeItem(item);
        };

        vm.save = function () {

            Lang.save(vm.Item, $scope.action).then(function (result) {
                vm.Item = result;

                if (typeof $scope.onSave == 'function'){
                    $scope.onSave({result : vm.Item});
                }

                /**
                 * Now what? close the modal?
                 */
                Helpers.toast('Saved!');
            });
        }
    }
})();
