(function () {
    angular.module('mcms.pages.page')
        .directive('editPageCategory', Directive);

    Directive.$inject = ['PAGES_CONFIG', '$timeout'];
    DirectiveController.$inject = ['$scope', 'PageCategoryService',
        'core.services', 'configuration', 'AuthService', 'LangService',
        'PAGES_CONFIG', 'ItemSelectorService'];

    function Directive(Config, $timeout) {

        return {
            templateUrl: Config.templatesDir + "PageCategory/editPageCategory.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require: ['editPageCategory'],
            scope: {
                options: '=?options',
                addTo: '=?addTo',
                item: '=?item',
                onSave: '&?onSave'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true
                };

                controllers[0].init(scope.item);
                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
            }
        };
    }

    function DirectiveController($scope, PageCategory, Helpers, Config, ACL, Lang, PagesConfig, ItemSelector) {
        var vm = this;
        vm.Lang = Lang;
        vm.defaultLang = Lang.defaultLang();
        vm.Locales = Lang.locales();
        vm.ValidationMessagesTemplate = Config.validationMessages;
        vm.Roles = ACL.roles();
        vm.Item = {};
        vm.Parent = null;
        vm.Roles = ACL.roles();
        vm.Permissions = ACL.permissions();
        vm.isSu = ACL.role('su');//more efficient check
        vm.isAdmin = ACL.role('admin');//more efficient check
        vm.tabs = [
            {
                label: 'General',
                file: PagesConfig.templatesDir + 'PageCategory/Components/tab-general-info.html',
                active: true,
                default: true,
                alias: 'general'
            },
            {
                label: 'Translations',
                file: PagesConfig.templatesDir + 'PageCategory/Components/tab-translations.html',
                active: false,
                alias: 'translations',
            },
            {
                label: 'Extra Fields',
                file: PagesConfig.templatesDir + 'Page/Components/tab-extra-fields.html',
                active: false,
                alias: 'extraFields',
            },
            {
                label: 'Featured',
                file: PagesConfig.templatesDir + 'PageCategory/Components/tab-featured.html',
                active: false,
                alias: 'featured',
            },
        ];

        vm.thumbUploadOptions = {
            uploadConfig: {
                url: Config.imageUploadUrl,
                fields: {
                    container: 'Item'
                }
            }
        };
        vm.UploadConfig = {
            file: {},
            image: vm.imagesUploadOptions
        };

        vm.init = function (item) {
            if (typeof item == 'number') {
                //call for data from the server
                PageCategory.find(item)
                    .then(init);
            }

            init(item);

        };

        vm.onResult = function (result) {
            if (typeof vm.Item.featured == 'undefined' || !vm.Item.featured){
                vm.Item.featured = [];
            }

            result.category_id = vm.Item.id;
            console.log(result);
            vm.Item.featured.push(result);
        };


        vm.save = function () {
            PageCategory.save(vm.Item)
                .then(function (result) {
                    var isNew = (!vm.Item.id && result.id);
                    if (isNew) {
                        vm.Item = result;
                        vm.Item.children = [];
                    }

                    Helpers.toast('Saved!');

                    if (typeof $scope.onSave == 'function') {
                        $scope.onSave({item: vm.Item, isNew: isNew, parent: vm.Parent});
                    }
                });
        };

        function init(item) {
            vm.Connectors = ItemSelector.connectors();
            vm.Item = item;
            vm.Parent = $scope.addTo || null;
            vm.thumbUploadOptions.uploadConfig.fields.item_id = item.id;
            vm.thumbUploadOptions.uploadConfig.fields.configurator = '\\IdeaSeven\\Pages\\Services\\PageCategory\\ImageConfigurator';
            vm.thumbUploadOptions.uploadConfig.fields.type = 'thumb';
        }
    }
})();