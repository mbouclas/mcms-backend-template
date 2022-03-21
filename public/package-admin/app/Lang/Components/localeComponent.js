(function () {
    angular.module('mcms.lang')
        .directive('localeComponent', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'LocaleService','core.services'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "Lang/Components/locale.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['localeComponent'],
            scope: {
                options: '=?options',
                item: '=?item',
                onSave: '&?onSave'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true
                };

                controllers[0].set(scope.item);
                scope.redactorConfig = Config.redactor;
                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
            }
        };
    }

    function DirectiveController($scope, LS, Helpers) {
        var vm = this;
        vm.Item = {};


        vm.set = function (item) {
            vm.Item = item;
        };



        vm.save = function () {
            //find the local code and add it to the item to be sent
            var found = LS.find({name : vm.Item.name});
            vm.Item.code = found.code;

            LS.update(vm.Item).then(function (result) {
                if (typeof $scope.onSave == 'function'){
                    $scope.onSave({result : vm.Item});
                }


                Helpers.toast('Saved!');
            });
        }
    }
})();
