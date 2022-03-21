(function () {
    angular.module('mcms.itemSelector')
        .directive('itemSelector', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope','core.services', 'LangService', 'ItemSelectorService',
        'lodashFactory', 'core.services'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "ItemSelector/itemSelector.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['itemSelector'],
            scope: {
                items: '=?items',
                connector : '=?connector',
                onResult : '&onResult',
                options : '=?options'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true,
                    connector : {
                    },
                    maxItems : null,
                    minItems : null,
                    multiple : true,
                };

                scope.Title = attrs.title || null;
                if (typeof attrs.items != 'undefined'){
                    scope.$watch('items', function (val) {
                        if (val){
                            controllers[0].set(val);
                        }
                    });
                } else {
                    controllers[0].set();
                }

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
                if (scope.options.searchOn){
                    scope.searchOn = true;
                }
            }
        };
    }

    function DirectiveController($scope, Core, Lang, ItemSelectorService, lo, Helpers) {
        var vm = this;
        vm.Lang = Lang;
        vm.defaultLang = Lang.defaultLang();
        vm.Connectors = ItemSelectorService.connectors();
        vm.Items = [];
        vm.Item = {};

        vm.set = function (items) {

            //override default connectors
            if (typeof $scope.connector != 'undefined'){
                vm.Connectors = $scope.connector;
            }

            if (lo.isArray($scope.options.allow)){
                var allowedConnectors = [];
                lo.forEach($scope.options.allow, function (connector) {
                    var found = lo.find(vm.Connectors, {name : connector});

                    if (found){
                        allowedConnectors.push(found);
                    }
                });

                if (allowedConnectors.length > 0){
                    vm.Connectors = allowedConnectors;
                }
            }

            if (lo.isArray($scope.options.deny)){
                var deniedConnectors = [];
                lo.forEach($scope.options.deny, function (connector) {
                    var found = lo.find(angular.copy(vm.Connectors), {name : connector});
                    if (found){
                        deniedConnectors.push(found);
                    }
                });

                if (deniedConnectors.length > 0){
                    vm.Connectors = deniedConnectors;
                }
            }

            if ($scope.options.multiple){
                vm.Items = (typeof items == 'undefined') ? [] : items;
                for (var i in items){
                    attachItemType(items[i]);
                }
            } else {
                vm.Item = (typeof items == 'undefined') ? {} : items;
            }
        };

        function attachItemType(item, model) {
            model = model || 'dest_model';
            if (typeof item[model] != 'undefined' && item[model]){
                var parts = item[model].split('\\');
                item.type = parts[parts.length-1];
            }

            return item;
        }

        vm.removeItem = function (item) {
            Helpers.toast((item.title || '') + ' Removed...');
            vm.Items.splice(vm.Items.indexOf(item), 1);
        };

        vm.resetItem = function () {
            Helpers.toast(vm.Item.title + ' Removed...');

            vm.Item = {};
            $scope.onResult({result : vm.Item});
        };

        vm.onResult = function (result) {
            if (lo.isNumber($scope.options.maxItems) && ($scope.options.multiple) && (vm.Items.length == $scope.options.maxItems)){
                Helpers.toast('Only ' + $scope.options.maxItems + ' items are allowed',null, 5000, 'error');
                return;
            }

            attachItemType(result, 'model');

            if (!$scope.options.multiple){
                vm.Item = result;
                $scope.searchOn = false;
            }

            Helpers.toast(result.title + ' selected...', null, 5000);

            $scope.onResult({result : result});
        }
    }
})();