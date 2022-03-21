(function () {
    angular.module('mcms.menu')
        .directive('addNode', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'MenuService', 'core.services'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "Menu/Components/addNode.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['addNode'],
            scope: {
                options: '=?options',
                connectors : '=connectors',
                addTo: '=?addTo',
                onResult : '&onResult'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true
                };

                controllers[0].set(scope.connectors);
                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
            }
        };
    }

    function DirectiveController($scope, Menu, Core) {
        var vm = this;
        vm.Parent = null;
        vm.Connectos = [];

        vm.set = function (connectors) {
            vm.Connectors = connectors;
            vm.Parent = $scope.addTo || null;
        };

        vm.onResult = function (result) {

            $scope.onResult({result : result, parent : vm.Parent});
        }
    }
})();
