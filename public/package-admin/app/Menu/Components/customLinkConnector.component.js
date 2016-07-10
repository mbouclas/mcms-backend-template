(function () {
    angular.module('mcms.menu')
        .directive('customLinkConnector', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'MenuService', 'LangService', 'configuration'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "Menu/Components/customLinkConnector.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['customLinkConnector'],
            scope: {
                options: '=?options',
                item : '=?item',
                onResult : '&onResult'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true
                };

                if (scope.item){
                    controllers[0].set(scope.item);
                }

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
            }
        };
    }

    function DirectiveController($scope, Menu, Lang, Config) {
        var vm = this;
        vm.Item = {
            link : '',
            title : {}
        };
        vm.ValidationMessagesTemplate = Config.validationMessages;
        vm.Locales = Lang.locales();

        vm.set = function (item) {
            vm.Item = item;
        };

        vm.save = function () {
            //pass it down to the caller
            $scope.onResult({result : vm.Item});
        };
    }
})();
