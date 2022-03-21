(function () {
    angular.module('mcms.menu')
        .directive('menuConnector', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'MenuService', 'core.services'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "Menu/Components/menuConnector.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['menuConnector'],
            scope: {
                options: '=?options',
                connector : '=connector',
                onResult : '&onResult'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true
                };


                controllers[0].set(scope.connector);

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
            }
        };
    }

    function DirectiveController($scope, Menu, Core) {
        var vm = this;
        vm.Connector = {};
        vm.Sections = [];

        this.set = function (connector) {
            vm.Connector = connector;
            vm.Sections = connector.connector.sections;
        };

        vm.onSelect = function (result) {
            //pass it down to the caller
            $scope.onResult({result : result});
        };
    }
})();
