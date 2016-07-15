(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
    'use strict';

    angular.module('mcms.pages.pageCategory')
        .controller('PageCategoryHomeController',Controller);

    Controller.$inject = ['init', 'LangService', 'Dialog', 'PageCategoryService', 'core.services', 'ItemSelectorService'];

    function Controller(Categories, Lang, Dialog, PageCategoryService, Helpers, ItemSelector) {
        var vm = this;
        vm.Categories = Categories;
        vm.Lang = Lang;
        vm.defaultLang = Lang.defaultLang();
        vm.treeOptions = {
            dragStop: function (ev) {

            }
        };

        PageCategoryService.find(3)
            .then(function (res) {
                vm.Item = res;
                vm.Connectors = ItemSelector.connectors();

            });

        vm.onResult = function (result) {
            if (typeof vm.Item.featured == 'undefined' || !vm.Item.featured){
                vm.Item.featured = [];
            }

            vm.Item.featured.push(result);
        };

        vm.onSave =function (item, isNew, parent) {
            if (isNew){
                if (parent){
                    if (!parent.children){
                        parent.children = [];
                    }

                    parent.children.push(item);
                } else {
                    vm.Categories.push(item);
                }

                Dialog.close();
                vm.edit(item);
            }
        };

        vm.add = function (node) {
            node = node || null;
            var newCategory = PageCategoryService.newCategory();
            newCategory.parent_id = node.id;

            Dialog.show({
                title: (!node) ? 'Create root node' : 'Add node to "' + node.title[vm.defaultLang] + '"',
                contents: '<edit-page-category item="VM.node" add-to="VM.parentNode" ' +
                'on-save="VM.onSave(item, isNew, parent)"></edit-page-category>',
                locals: {
                    node: newCategory,
                    onSave: vm.onSave,
                    parentNode: node || null
                }
            });
        };

        vm.edit = function (node) {
            if (!node){
                node = PageCategoryService.newCategory();
            }

            Dialog.show({
                title: (node.id) ? 'Edit "' + node.title[vm.defaultLang] + '"' : 'Create new',
                contents: '<edit-page-category item="VM.node" ' +
                'on-save="VM.onSave(item, isNew)"></edit-page-category>',
                locals: {
                    node: (node.id) ? node.id : node,
                    onSave: vm.onSave
                }
            });

        };

        vm.save = function () {
            PageCategoryService.rebuild(vm.Categories)
                .then(function () {
                    Helpers.toast('Saved!');
                });
        };

        vm.delete = function (node) {
            Helpers.confirmDialog({}, {})
                .then(function () {
                    PageCategoryService.destroy(node)
                        .then(function (nodes) {
                            vm.Categories = nodes;
                            Helpers.toast('Deleted');
                        });
                });
        };
    }

})();

},{}],2:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('mcms.pages.pageCategory')
        .service('PageCategoryDataService',Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var _this = this;
        var baseUrl = '/admin/api/pageCategory/';

        this.index = index;
        this.tree = tree;
        this.store = store;
        this.show = show;
        this.update = update;
        this.destroy = destroy;
        this.rebuild = rebuild;

        function index() {
            return $http.get(baseUrl).then(returnData);
        }

        function tree(filters) {
            return $http.get(baseUrl + 'tree', {params : filters}).then(returnData);
        }

        /**
         * Creates a new category
         *
         * @param {object} category - the category object
         * @returns {object} - the ajax response
         */
        function store(category) {
            return $http.post(baseUrl, category)
                .then(returnData);
        }

        function show(id) {
            return $http.get(baseUrl + id)
                .then(returnData);
        }

        function update(category) {
            return $http.put(baseUrl + category.id, category)
                .then(returnData);
        }

        function destroy(id) {
            return $http.delete(baseUrl + id)
                .then(returnData);
        }

        function rebuild(tree) {
            return $http.put(baseUrl + 'rebuild', tree)
                .then(returnData);
        }

        function returnData(response) {
            return response.data;
        }
    }
})();

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
(function(){
    'use strict';

    angular.module('mcms.pages.pageCategory', [
        'ui.tree'
    ])
        .run(run);

    run.$inject = ['mcms.menuService'];

    function run(Menu) {

    }


})();

require('./routes');
require('./dataService');
require('./service');
require('./PageCategoryHomeController');
require('./editPageCategory.component');
},{"./PageCategoryHomeController":1,"./dataService":2,"./editPageCategory.component":3,"./routes":5,"./service":6}],5:[function(require,module,exports){
(function() {
    'use strict';

    angular.module('mcms.pages.pageCategory')
        .config(config);

    config.$inject = ['$routeProvider','PAGES_CONFIG'];

    function config($routeProvider,Config) {

        $routeProvider
            .when('/pages/categories', {
                templateUrl:  Config.templatesDir + 'PageCategory/index.html',
                controller: 'PageCategoryHomeController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                resolve: {
                    init : ["AuthService", '$q', 'PageCategoryService', function (ACL, $q, Category) {
                        return (!ACL.role('admin')) ? $q.reject(403) : Category.get();
                    }]
                },
                name: 'pages-categories'
            });
    }

})();

},{}],6:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('mcms.pages.pageCategory')
        .service('PageCategoryService',Service);

    Service.$inject = ['PageCategoryDataService', 'ItemSelectorService'];
    /**
     * The PageCategory service
     *
     * @param {object} DS
     * @param ItemSelector
     * @constructor
     */
    function Service(DS, ItemSelector) {
        var _this = this;
        var Categories = [];
        this.get = get;
        this.find = find;
        this.newCategory = newCategory;
        this.save = save;
        this.destroy = destroy;
        this.rebuild = rebuild;
        this.tree = tree;
        this.categories = categories;

        function get() {
            return DS.index()
                .then(function (response) {
                    Categories = response;
                    return response;
                });
        }

        function find(id) {
            return DS.show(id)
                .then(function (response) {
                    ItemSelector.register(response.connectors);
                    return response.item;
                });
        }

        function tree(filters) {
            return DS.tree(filters)
                .then(function (response) {
                    return response;
                });
        }


        /**
         * Create the holder object for a new category object
         *
         * @returns {{title: string, description: string, slug: string, children: Array, settings: {}, active: boolean, orderBy: number}}
         */
        function newCategory() {
            return {
                title : '',
                description : '',
                slug : '',
                children : [],
                settings : {},
                active : false,
                orderBy : 0,
            };
        }

        function save(item) {
            if (!item.id){
                return DS.store(item);
            }


            return DS.update(item);
        }

        function destroy(item) {
            return DS.destroy(item.id);
        }

        function rebuild(tree) {
            return DS.rebuild(tree)
                .then(function (newTree) {
                    Categories = newTree;
                });
        }

        function categories() {
            return Categories;
        }

    }
})();

},{}],7:[function(require,module,exports){
(function() {
    'use strict';

    angular.module('mcms.pages.page')
        .controller('PageController',Controller);

    Controller.$inject = ['item', 'LangService', '$location', '$filter'];

    function Controller(Item, Lang, $location, $filter) {
        var vm = this;

        vm.Item = Item;
        vm.defaultLang = Lang.defaultLang();

        vm.onSave = function (item, isNew) {
            if (isNew){
                $location.path($filter('reverseUrl')('pages-edit',{id : item.id}).replace('#',''));
            }
        }
    }

})();

},{}],8:[function(require,module,exports){
(function() {
    'use strict';

    angular.module('mcms.pages.page')
        .controller('PageHomeController',Controller);

    Controller.$inject = ['init', 'PageService', '$mdBottomSheet', 'LangService',
        '$mdSidenav', 'BottomSheet', 'Dialog', '$filter', '$location', 'core.services'];

    function Controller(Init, PageService, $mdBottomSheet, Lang, $mdSidenav, BottomSheet, Dialog, $filter, $location, Helpers) {
        var vm = this;
        vm.filters = {
            title: null,
            description: null,
            description_long: null,
            active: null,
            userId: null,
            dateStart: null,
            dateEnd: null,
            category_ids : [],
            dateMode: 'created_at',
            orderBy : 'created_at',
            way : 'DESC',
            page: 1
        };
        vm.boolValues = [
            {
                label: 'Don\'t care',
                value: null
            },
            {
                label: 'Yes',
                value: true
            },
            {
                label: 'No',
                value: false
            }
        ];
        var Pages = Init[0];
        vm.Lang = Lang;
        vm.defaultLang = Lang.defaultLang();
        vm.Pagination = Pages;
        vm.Items = Pages.data;
        vm.Categories = Init[1];

        vm.sort = function (sort, direction) {
            vm.filters.orderBy = sort;
            vm.filters.way = direction || null;
            filter();
        };

        function filter() {
            vm.Loading = true;
            vm.Items = [];
            return PageService.get(vm.filters)
                .then(function (res) {
                    vm.Loading = false;
                    vm.Pagination = res;
                    vm.Items = res.data;
                });
        }

        vm.changePage = function (page, limit) {
            vm.filters.page = page;
            filter();
        };

        vm.applyFilters = function () {
            filter();
        };

        vm.listItemClick = function($index) {
            $mdBottomSheet.hide(clickedItem);
        };

        vm.toggleFilters = function () {
            $mdSidenav('filters').toggle();
        };

        vm.edit = function (item) {
            var id = (item) ? item.id : 'new';
            $location.path($filter('reverseUrl')('pages-edit',{id : id}).replace('#',''));
        };

        vm.quickEdit = function (item) {
            if (!item || !item.id){
                item = PageService.newPage();
            }


            Dialog.show({
                title : (!item.id) ? 'Create item' : 'Edit #' + item.id,
                contents : '<edit-page item="VM.Item.id" on-save="VM.onSave(item, isNew)"></edit-page>',
                locals : {
                    Item :item,
                    onSave : vm.onSave
                }
            });
        };

        vm.enableItem = function (item) {
            item.active = true;

            PageService.save(item)
                .then(function () {
                    Helpers.toast('Saved!');
                });
        };

        vm.disableItem = function (item) {
            item.active = false;

            PageService.save(item)
                .then(function () {
                    Helpers.toast('Saved!');
                });
        };

        vm.delete = function (item) {
            Helpers.confirmDialog({}, {})
                .then(function () {
                    PageService.destroy(item)
                        .then(function () {
                            filter();
                            Helpers.toast('Saved!');
                        });
                });
        };

        vm.showActions = function (ev, item) {
            var toggle = (item.active) ?
            { name: 'Disable', icon: 'block', fn : vm.disableItem } :
            { name: 'Enable', icon: 'done', fn : vm.enableItem };

            BottomSheet.show({
                item : item,
                title : 'Edit ' + item.title[vm.defaultLang]
            },[
                { name: 'Edit', icon: 'edit', fn : vm.edit },
                { name: 'Quick Edit', icon: 'edit', fn : vm.quickEdit },
                toggle,
                { name: 'Delete', icon: 'delete', fn : vm.delete },
            ]);
        };
    }

})();

},{}],9:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('mcms.pages.page')
        .service('PageDataService',Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var _this = this;
        var baseUrl = '/admin/api/page/';

        this.index = index;
        this.store = store;
        this.show = show;
        this.update = update;
        this.destroy = destroy;

        function index(filters) {
            return $http.get(baseUrl, {params : filters}).then(returnData);
        }

        function store(item) {
            return $http.post(baseUrl, item)
                .then(returnData);
        }

        function show(id) {
            return $http.get(baseUrl + id)
                .then(returnData);
        }

        function update(item) {
            return $http.put(baseUrl + item.id, item)
                .then(returnData);
        }

        function destroy(id) {
            return $http.delete(baseUrl + id)
                .then(returnData);
        }

        function returnData(response) {
            return response.data;
        }
    }
})();

},{}],10:[function(require,module,exports){
(function () {
    angular.module('mcms.pages.page')
        .directive('editPage', Directive);

    Directive.$inject = ['PAGES_CONFIG', '$timeout'];
    DirectiveController.$inject = [ '$scope','PageService',
        'core.services', 'configuration', 'AuthService', 'LangService',
        'PageCategoryService',  'PAGES_CONFIG', 'ItemSelectorService', 'lodashFactory'];

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

    function DirectiveController($scope, Page, Helpers, Config, ACL, Lang, PageCategory, PagesConfig, ItemSelector, lo) {
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

        vm.onResult = function (result) {
            if (typeof vm.Item.related == 'undefined' || !vm.Item.related){
                vm.Item.related = [];
            }

            result.source_item_id = vm.Item.id;

            vm.Item.related.push(result);
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
            vm.Connectors = ItemSelector.connectors();
            vm.thumbUploadOptions.uploadConfig.fields.item_id = item.id;
            vm.thumbUploadOptions.uploadConfig.fields.configurator = '\\IdeaSeven\\Pages\\Services\\Page\\ImageConfigurator';
            vm.thumbUploadOptions.uploadConfig.fields.type = 'thumb';

            vm.imagesUploadOptions.fields.item_id = item.id;
            vm.imagesUploadOptions.fields.configurator = '\\IdeaSeven\\Pages\\Services\\Page\\ImageConfigurator';
            vm.imagesUploadOptions.fields.type = 'images';
        }
    }
})();

},{}],11:[function(require,module,exports){
(function(){
    'use strict';

    angular.module('mcms.pages.page', [])
        .run(run);

    run.$inject = ['mcms.menuService'];

    function run(Menu) {

    }
})();

require('./routes');
require('./dataService');
require('./service');
require('./PageHomeController');
require('./PageController');
require('./editPage.component');

},{"./PageController":7,"./PageHomeController":8,"./dataService":9,"./editPage.component":10,"./routes":12,"./service":13}],12:[function(require,module,exports){
(function() {
    'use strict';

    angular.module('mcms.pages.page')
        .config(config);

    config.$inject = ['$routeProvider','PAGES_CONFIG'];

    function config($routeProvider,Config) {

        $routeProvider
            .when('/pages/content', {
                templateUrl:  Config.templatesDir + 'Page/index.html',
                controller: 'PageHomeController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                resolve: {
                    init : ["AuthService", '$q', 'PageService', function (ACL, $q, Page) {
                        return (!ACL.role('admin')) ? $q.reject(403) : Page.init();
                    }]
                },
                name: 'pages-home'
            })
            .when('/pages/content/:id', {
                templateUrl:  Config.templatesDir + 'Page/editPage.html',
                controller: 'PageController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                resolve: {
                    item : ["AuthService", '$q', 'PageService', '$route', function (ACL, $q, Page, $route) {
                        return (!ACL.role('admin')) ? $q.reject(403) : Page.find($route.current.params.id);
                    }]
                },
                name: 'pages-edit'
            });
    }

})();

},{}],13:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('mcms.pages.page')
        .service('PageService',Service);

    Service.$inject = ['PageDataService', 'LangService', 'lodashFactory', 'mediaFileService',
        '$q', 'PageCategoryService', 'ItemSelectorService'];

    function Service(DS, Lang, lo, MediaFiles, $q, PageCategoryService, ItemSelector) {
        var _this = this;
        var Pages = [];
        this.get = get;
        this.init = init;
        this.find = find;
        this.newPage = newPage;
        this.save = save;
        this.destroy = destroy;

        function init() {
            var tasks = [
                get(),
                categories()
            ];

            return $q.all(tasks);
        }

        function get(filters) {
            return DS.index(filters)
                .then(function (response) {
                    Pages = response;
                    return Pages;
                });
        }

        function categories() {
            return PageCategoryService.tree();
        }

        function find(id) {
            return DS.show(id)
                .then(function (response) {
                    ItemSelector.register(response.connectors);
                    MediaFiles.setImageCategories(response.imageCategories);
                    return response.item || newPage();
                });
        }

        function newPage() {
            return {
                title : Lang.langFields(),
                slug : '',
                description : Lang.langFields(),
                description_long : Lang.langFields(),
                active : false,
                categories : [],
                extraFields : [],
                related : [],
                settings : {},
                id : null
            };
        }

        function save(item) {
            if (!item.id){
                return DS.store(item);
            }


            return DS.update(item);
        }

        function destroy(item) {
            return DS.destroy(item.id);
        }



    }
})();

},{}],14:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('mcms.pages', [
        'mcms.mediaFiles',
        'mcms.extraFields',
        'mcms.pages.page',
        'mcms.pages.pageCategory',
        'ngFileUpload'
    ])

        .run(run);

    run.$inject = ['mcms.menuService'];

    function run(Menu) {

        Menu.addMenu(Menu.newItem({
            id: 'pages',
            title: 'Pages',
            permalink: '',
            icon: 'pages',
            order: 1,
            acl: {
                type: 'role',
                permission: 'admin'
            }
        }));

        var pagesMenu = Menu.find('pages');

        pagesMenu.addChildren([
            Menu.newItem({
                id: 'pages-manager',
                title: 'Content',
                permalink: '/pages/content',
                icon: 'content_copy',
                order : 2
            })
        ]);

        pagesMenu.addChildren([
            Menu.newItem({
                id: 'pagesCategories-manager',
                title: 'Categories',
                permalink: '/pages/categories',
                icon: 'view_list',
                order : 1
            })
        ]);
    }

})();

require('./config');
require('./Page');
require('./PageCategory');
},{"./Page":11,"./PageCategory":4,"./config":15}],15:[function(require,module,exports){
(function(){
    'use strict';
    var assetsUrl = '/assets/',
        appUrl = '/app/',
        componentsUrl = appUrl + 'Components/',
        templatesDir = '/package-pages/app/templates/';

    var config = {
        apiUrl : '/api/',
        prefixUrl : '/admin',
        templatesDir : templatesDir,
        imageUploadUrl: '/admin/api/upload/image',
        imageBasePath: assetsUrl + 'img',
        validationMessages : templatesDir + 'Components/validationMessages.html',
        appUrl : appUrl,
        componentsUrl : componentsUrl,
        fileTypes : {
            image : {
                accept : 'image/*',
                acceptSelect : 'image/jpg,image/JPG,image/jpeg,image/JPEG,image/PNG,image/png,image/gif,image/GIF'
            },
            document : {
                accept : 'application/pdf,application/doc,application/docx',
                acceptSelect : 'application/pdf,application/doc,application/docx'
            },
            file : {
                accept : 'application/*',
                acceptSelect : 'application/*'
            },
            audio : {
                accept : 'audio/*',
                acceptSelect : 'audio/*'
            }
        }
    };

    angular.module('mcms.core')
        .constant('PAGES_CONFIG',config);
})();
},{}]},{},[14]);
