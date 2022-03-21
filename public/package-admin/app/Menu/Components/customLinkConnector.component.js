(function () {
    angular.module('mcms.menu')
        .directive('customLinkConnector', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'MenuService', 'LangService', 'configuration', 'lodashFactory'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "Menu/Components/customLinkConnector.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['customLinkConnector'],
            scope: {
                options: '=?options',
                item : '=?item',
                ParentMenu : '=?parentMenu',
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

    function DirectiveController($scope, Menu, Lang, Config, lo) {
        var vm = this;
        vm.Item = {
            link : '',
            title : {},
            settings : {}
        };
        vm.Parent = {};
        vm.ValidationMessagesTemplate = Config.validationMessages;
        vm.Locales = Lang.locales();

        vm.set = function (item) {
            if (!lo.isObject(item.settings) || lo.isArray(item.settings)){
                item.settings = {};
            }

            if (typeof $scope.ParentMenu != 'undefined'){
                vm.Parent = $scope.ParentMenu;
            }

            vm.Item = item;
        };

        $scope.targetOptions = [
            {
                label: 'Same tab',
                value: '_self'
            },
            {
                label: 'New tab',
                value: '_blank'
            }
        ];

        vm.save = function () {
            //pass it down to the caller
            $scope.onResult({result : vm.Item});
        };
    }
})();
