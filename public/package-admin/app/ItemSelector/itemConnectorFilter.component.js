(function () {
    angular.module('mcms.itemSelector')
        .directive('itemConnectorFilter', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'ItemSelectorService', 'core.services', '$timeout', 'lodashFactory'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "ItemSelector/itemConnectorFilter.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['itemConnectorFilter'],
            scope: {
                options: '=?options',
                connector : '=connector',
                section : '=section',
                onSelect : '&onSelect'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true,
                    searchOn : false
                };


                controllers[0].set(scope.connector, scope.section);

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);

            }
        };
    }

    function DirectiveController($scope, ItemSelector, Core, $timeout, lo) {
        var vm = this;
        var delay = 500,
            timer = false;
        vm.Connector = {};
        vm.filter = '';
        vm.Results = [];

        vm.Section = {};
        vm.setCurrentFilter = function () {
            vm.CurrentFilter = lo.find(vm.Section.filters, {key : vm.filterKey});
        }

        this.set = function (connector, section) {
            vm.Connector = connector;
            vm.Section = section;
            var keyFound = lo.find(vm.Section.filters, {default : true});
            vm.filterKey = (keyFound) ? keyFound.key  : vm.Section.filters[0].key;
            vm.setCurrentFilter();

            if (typeof section.settings.preload != 'undefined' && section.settings.preload){
                $timeout(function () {
                    vm.applyFilter();
                });
            }
        };


        
        vm.get = function (query) {
            vm.Loading = true;
            return ItemSelector.filter(query, vm.Connector.name, vm.Section.name)
                .then(function (res) {
                    vm.Loading = false;

                    return (!query) ? res : res.data.filter( Core.createFilterFor('title',query) );
                });
        };

        vm.applyFilter = function () {
            if(timer){
                $timeout.cancel(timer)
            }

            timer = $timeout(function(){
                query = {};
                query[vm.filterKey] = vm.filter;
                vm.get(query).then(function (results) {
                    vm.Results = results;
                });
            },delay);
        };

        vm.onSelected = function (item) {
            console.log(item);
        };

        vm.selectResult = function (result) {
            //pass it down to your parent component
            $scope.onSelect({result : result});
        }
    }
})();
