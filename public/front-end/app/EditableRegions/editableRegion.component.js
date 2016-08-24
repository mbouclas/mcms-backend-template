(function () {
    angular.module('mcms.frontEnd.editableRegions')
        .directive('editableRegion', Directive);

    Directive.$inject = ['FRONTEND_CONFIG'];
    DirectiveController.$inject = [ '$scope', '$timeout', 'ItemSelectorService',
        'FRONTEND_CONFIG', 'lodashFactory', 'LangService'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + 'EditableRegions/editableRegion.component.html',
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['editableRegion'],
            scope: {
                region: '=region',
                options: '=?options',
                onSelectItem : '&?onSelectItem',
                item: '=?item',
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true
                };

                controllers[0].init(scope.region);
                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
            }
        };
    }

    function DirectiveController($scope, $timeout, ItemSelector, Config, lo, Lang) {
        var vm = this;
        vm.defaultLang = Lang.defaultLang();
        vm.Locales = Lang.locales();
        vm.Region = {};
        vm.Image = {};
        vm.Structured = {};
        vm.HTML = Lang.langFields();
        vm.Connectors = ItemSelector.connectors();
        vm.itemSelectorOptions = {itemsHidden : true, searchOn : true};
        vm.Item = {};
        vm.tabs = [
            {
                label : 'HTML',
                file : Config.templatesDir + 'EditableRegions/Components/tab-html.html',
                active : true,
                default : true,
                alias : 'text',
                type : 'html'
            },
            {
                label : 'Image',
                file : Config.templatesDir + 'EditableRegions/Components/tab-image.html',
                active : false,
                alias : 'image',
                type : 'image'
            },
            {
                label : 'Item',
                file : Config.templatesDir + 'EditableRegions/Components/tab-item.html',
                active : false,
                default : false,
                alias : 'item',
                type : 'item'
            },
            {
                label : 'Structured Data',
                file : Config.templatesDir + 'EditableRegions/Components/tab-structured-data.html',
                active : false,
                alias : 'structured',
                type : 'structured',
            },
        ];
        vm.Settings = [];


        var CurrentType = vm.tabs[0].type;

        vm.init = function (region) {
            vm.Region = region;
            if (typeof $scope.item != 'undefined'){
                var selectedTab = lo.find(vm.tabs, {type : $scope.item.type});
                //set tab
                setTab(selectedTab);

                if ($scope.item.type == 'image'){
                    vm.Image = $scope.item.item;
                    vm.Item = $scope.item;
                }
                else if ($scope.item.type == 'structured'){
                    vm.Structured = $scope.item.item;
                    vm.Item = $scope.item;
                }
                else if ($scope.item.type == 'html'){
                    vm.HTML = $scope.item.item;
                    vm.Item = $scope.item;
                }
                else {
                    vm.Item = $scope.item;
                }
            }
            vm.Settings  = region.structuredData;

        };

        vm.save = function(){
            if (CurrentType == 'image') {
                vm.Item = vm.Image;
            }
            else if (CurrentType == 'structured') {
                vm.Item = vm.Structured;
            }
            else if (CurrentType == 'html') {
                vm.Item = vm.HTML;
            }

            var ret = {
                type : CurrentType,
                item : vm.Item
            };

            if (typeof $scope.onSelectItem == 'function'){
                $timeout(function () {
                    var isNew = (typeof $scope.item == 'undefined');
                    $scope.onSelectItem({region: vm.Region, item: ret, isNew : isNew});
                });
            }

            return ret;
        };

        vm.onTabChange = function (tab) {
            CurrentType = tab.type;

            if (typeof $scope.item != 'undefined'){
                return;
            }

            switch (tab.type) {
                case 'image' : vm.Item = {};
                    break;
                case 'structured' : vm.Item = {};
                    break;
                case 'html' : vm.Item = {};
                    break;
                default : vm.Item = {};
                    break;
            }
        };

        vm.onResult = function (result) {
            delete result.section;
            vm.Item = result;
        };

        function setTab(tab) {
            //reset
            for (var i in vm.tabs){
                vm.tabs[i].active = false;
                vm.tabs[i].default = false;
            }

            tab.default = true;
            tab.active = true;
        }
    }
})();
