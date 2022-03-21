(function () {
    angular.module('mcms.user')
        .directive('userExtraFields', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'configuration'];

    function Directive(Config) {

        return {
            template : '<extra-fields-editor model="VM.Model"></extra-fields-editor>',
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['userExtraFields'],
            scope: {
                options: '=?options',
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true
                };

                // controllers[0].set(scope.item);

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
            }
        };
    }

    function DirectiveController($scope, Config) {
        var vm = this;
        vm.Model = Config.userModel;
    }


})();
