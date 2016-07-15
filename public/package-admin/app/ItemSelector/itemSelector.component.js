(function () {
    angular.module('mcms.itemSelector')
        .directive('itemSelector', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope','core.services', 'LangService'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "ItemSelector/itemSelector.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['itemSelector'],
            scope: {
                items: '=items',
                connector : '=connector',
                onResult : '&onResult'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true
                };
                scope.Title = attrs.title || null;

                scope.$watch('items', function (val) {
                    if (val){
                        controllers[0].set(val);
                    }
                });

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
            }
        };
    }

    function DirectiveController($scope, Core, Lang) {
        var vm = this;
        vm.Lang = Lang;
        vm.defaultLang = Lang.defaultLang();
        vm.Connectors = [];
        vm.Items = [];

        vm.set = function (items) {
            vm.Connectors = $scope.connector;
            vm.Items = items;
        };

        vm.removeItem = function (item) {
          vm.Items.splice(vm.Items.indexOf(item), 1);
        };

        vm.onResult = function (result) {
            $scope.onResult({result : result});
        }
    }
})();
