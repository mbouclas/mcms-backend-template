(function () {
    angular.module('mcms.pages.page')
        .directive('editPage', Directive);

    Directive.$inject = ['PAGES_CONFIG', '$timeout'];
    DirectiveController.$inject = [ '$scope','PageService',
        'core.services', 'configuration', 'AuthService', 'LangService',
        'PageCategoryService',  'PAGES_CONFIG'];

    function Directive(Config, $timeout) {

        return {
            templateUrl: Config.templatesDir + "Page/editPage.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['editPage'],
            scope: {
                options: '=?options',
                item: '=?item',
                onSave : '&?onSave'
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

    function DirectiveController($scope, Page, Helpers, Config, ACL, Lang, PageCategory, PagesConfig) {
        var vm = this;
        vm.Lang = Lang;
        vm.defaultLang = Lang.defaultLang();
        vm.Locales = Lang.locales();
        vm.ValidationMessagesTemplate = Config.validationMessages;
        vm.Roles = ACL.roles();
        vm.Item = {};
        vm.Roles = ACL.roles();
        vm.Permissions = ACL.permissions();
        vm.isSu = ACL.role('su');//more efficient check
        vm.isAdmin = ACL.role('admin');//more efficient check
        vm.tabs = [
            {
                label : 'General',
                file : PagesConfig.templatesDir + 'Page/Components/tab-general-info.html',
                active : true,
                default : true,
                alias : 'general'
            },
            {
                label : 'Translations',
                file : PagesConfig.templatesDir + 'Page/Components/tab-translations.html',
                active : false,
                alias : 'translations',
            },
            {
                label : 'Media files',
                file : PagesConfig.templatesDir + 'Page/Components/tab-media-files.html',
                active : false,
                default : false,
                alias : 'mediaFiles'
            },
            {
                label : 'Extra Fields',
                file : PagesConfig.templatesDir + 'Page/Components/tab-extra-fields.html',
                active : false,
                alias : 'extraFields',
            },
            {
                label : 'Related Items',
                file : PagesConfig.templatesDir + 'Page/Components/tab-related-items.html',
                active : false,
                alias : 'related',
                acl : 'isSu'
            }
        ];
        vm.Categories = [];
        vm.thumbUploadOptions = {
            uploadConfig : {
                url : Config.imageUploadUrl,
                fields : {
                    container : 'Item'
                }
            }
        };
        vm.imagesUploadOptions = {
            url : PagesConfig.imageUploadUrl,
            accept : PagesConfig.fileTypes.image.accept,
            acceptSelect : PagesConfig.fileTypes.image.acceptSelect,
            fields : {
                container : 'Item'
            },
            uploadOptions : PagesConfig.fileTypes.image.uploadOptions
        };
        vm.mediaFilesOptions = {imageTypes : []};
        vm.UploadConfig = {
            file : {},
            image : vm.imagesUploadOptions
        };
        vm.init = function (item) {
            if (!item.id){
                //call for data from the server
                Page.find(item)
                    .then(init);
            }

            init(item);

        };

        vm.exists = function (item, type) {
            type = (!type) ? 'checkForPermission' : 'checkFor' + type;
            return ACL[type](vm.User, item);
        };

        vm.save = function () {
            var isNew = (!(typeof vm.Item.id == 'number'));
            Page.save(vm.Item)
                .then(function (result) {
                   Helpers.toast('Saved!');

                    if (isNew){
                        vm.Item = result;
                    }

                    if (typeof $scope.onSave == 'function'){
                        $scope.onSave({item : result, isNew : isNew});
                    }
                });
        };

        vm.removeCategory = function (cat) {
            vm.Item.categories.splice(lo.findIndex(vm.Item.categories, {id : cat.id}), 1);
        };

        vm.onCategorySelected = function (cat) {

            if (!cat || typeof cat.id == 'undefined'){
                return;
            }

            if (lo.find(vm.Item.categories, {id : cat.id})){
                return;
            }

            vm.Item.categories.push(cat);
            vm.searchText = null;
        };

        vm.getCategories = function (query) {

            if (vm.Categories.length > 0){
                return (!query) ? vm.Categories : vm.Categories.filter( Helpers.createFilterFor('title',query) );
            }

            return PageCategory.tree()
                .then(function (res) {
                    vm.Categories = res;
                    return (!query) ? res : res.filter( Helpers.createFilterFor('title',query) );
                });
        };

        function init(item) {
            vm.Item = item;
            vm.thumbUploadOptions.uploadConfig.fields.item_id = item.id;
            vm.thumbUploadOptions.uploadConfig.fields.configurator = '\\IdeaSeven\\Pages\\Services\\Page\\ImageConfigurator';
            vm.thumbUploadOptions.uploadConfig.fields.type = 'thumb';

            vm.imagesUploadOptions.fields.item_id = item.id;
            vm.imagesUploadOptions.fields.configurator = '\\IdeaSeven\\Pages\\Services\\Page\\ImageConfigurator';
            vm.imagesUploadOptions.fields.type = 'images';
        }
    }
})();
