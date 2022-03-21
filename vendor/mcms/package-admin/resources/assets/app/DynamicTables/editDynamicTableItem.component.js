(function () {
    angular.module('mcms.dynamicTables')
        .directive('editDynamicTableItem', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'core.services', 'configuration', 'AuthService',
        'LangService', 'DynamicTableService', 'SeoService', 'ItemSelectorService', 'LayoutManagerService',
        'mcms.settingsManagerService', 'lodashFactory', '$location', '$filter'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "DynamicTables/editDynamicTableItem.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['editDynamicTableItem'],
            scope: {
                options: '=?options',
                onSave: '&?onSave',
                item : '=item'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true
                };


                controllers[0].init();
                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);

            }
        };
    }

    function DirectiveController($scope, Helpers, Config, ACL, Lang, DynamicTableService,
                                 SEO, ItemSelector, LMS, SM, lo, $location, $filter) {
        var vm = this;
        vm.Item = {};
        vm.Lang = Lang;
        vm.defaultLang = Lang.defaultLang();
        vm.Locales = Lang.locales();
        vm.ValidationMessagesTemplate = Config.validationMessages;
        vm.tabs = [
            {
                label: 'General',
                file: Config.templatesDir + 'DynamicTables/Components/tab-general-info.html',
                active: true,
                default: true,
                id: 'general',
                order : 1
            },
            {
                label: 'Translations',
                file: Config.templatesDir + 'DynamicTables/Components/tab-translations.html',
                active: false,
                id: 'translations',
                order : 10
            },
            {
                label: 'Featured',
                file: Config.templatesDir + 'DynamicTables/Components/tab-featured.html',
                active: false,
                id: 'featured',
                order : 30
            },
            {
                label : 'SEO',
                file : Config.templatesDir + 'DynamicTables/Components/tab-seo.html',
                active : false,
                id : 'seo',
                order : 40
            }
        ];
        vm.Layouts = LMS.layouts('dynamicTables');
        vm.LayoutsObj = LMS.toObj();
        vm.thumbUploadOptions = {
            url : Config.imageUploadUrl,
            acceptSelect : Config.fileTypes.image.acceptSelect,
            maxFiles : 1,
            params : {
                container : 'Item'
            }
        };

        vm.init = function () {
            vm.Item = $scope.item;
            vm.Connectors = ItemSelector.connectors();

            if (typeof vm.Item.settings == 'undefined' || lo.isArray(vm.Item.settings)){
                vm.Item.settings = {};
            }

            SEO.fillFields(vm.Item.settings, function (model, key) {
                SEO.prefill(model, vm.Item, key);
            });
            vm.SEO = SEO.fields();

            vm.Settings = SM.get({name : 'dynamicTables'});
            LMS.setModel(vm.Item);
        };

        vm.save = function () {
            DynamicTableService.save(vm.Item)
                .then(function (response) {
                    Helpers.toast('Saved!');
                    var isNew = (typeof vm.Item.id === 'undefined' || !vm.Item.id);
                    if (isNew){
                        $location.path($filter('reverseUrl')('dynamic-table-item-edit',{id : response.id}).replace('#',''));
                        return;
                    }

                    if (typeof $scope.onSave == 'function'){
                        $scope.onSave({item : response, isNew : isNew});
                    }
                });
        };
    }
})();
