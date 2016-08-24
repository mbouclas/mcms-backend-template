(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
    'use strict';

    angular.module('mcms.frontEnd.editableRegions')
        .controller('EditableRegionController',Controller);

    Controller.$inject = ['Region', 'Dialog', 'FRONTEND_CONFIG', 'configuration',
        'EditableRegionService', 'core.services', 'LangService'];

    function Controller(Region, Dialog, Config, BaseConfig, ERS, Helpers, Lang) {
        var vm = this;
        vm.tmpModel = {};
        vm.Region = Region;
        vm.defaultLang = Lang.defaultLang();
        vm.Locales = Lang.locales();

        vm.add = function (region, item) {

            Dialog.show({
                title : 'Add items ',
                contents : '<editable-region region="VM.region" item="VM.item" ' +
                'on-select-item="VM.onSelectItem(region, item, isNew)"></editable-region>',
                locals : {
                    item : item,
                    region : region,
                    onSelectItem : vm.onSelectItem
                }
            });
        };

        vm.edit = function (region) {

            Dialog.show({
                title : 'edit ' + region.label,
                templateUrl : Config.templatesDir + 'EditableRegions/editRegion.html',
                locals : {
                    Region : region,
                    ValidationMessagesTemplate : BaseConfig.validationMessages,
                    onSave : vm.updateRegion,
                    save : vm.save
                }
            });
        };

        vm.updateRegion = function (region) {

        };

        vm.save = function () {
            ERS.update(vm.Region.name, vm.Region)
                .then(function () {
                    Helpers.toast('Saved!');
                });
        };

        vm.onSelectItem = function (region, item, isNew) {
            if (isNew){
                region.items.push(item);
            }

            Dialog.close();
        };

        vm.delete = function (region, index) {
          region.items.splice(index, 1);
        };
    }

})();

},{}],2:[function(require,module,exports){
(function() {
    'use strict';

    angular.module('mcms.frontEnd.editableRegions')
        .controller('EditableRegionsHomeController',Controller);

    Controller.$inject = ['Regions'];

    function Controller(Regions) {
        var vm = this;


        vm.Regions = Regions;

    }

})();

},{}],3:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('mcms.frontEnd.editableRegions')
        .service('EditableRegionDataService',Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var _this = this;
        var baseUrl = '/admin/api/editableRegions/';

        this.index = index;
        this.update = update;

        function index(filters) {
            return $http.get(baseUrl, {params : filters}).then(returnData);
        }

        function update(id, item) {
            return $http.put(baseUrl + id, item)
                .then(returnData);
        }

        function returnData(response) {
            return response.data;
        }
    }
})();

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
(function(){
    'use strict';

    angular.module('mcms.frontEnd.editableRegions', [])
        .run(run);

    run.$inject = ['mcms.menuService'];

    function run(Menu) {

    }
})();
require('./dataService');
require('./service');
require('./EditableRegionsHomeController');
require('./EditableRegionController');
require('./editableRegion.component');
require('./routes');

/*
require('./routes');
require('./dataService');

require('./PageHomeController');
require('./PageController');
require('./editPage.component');
*/

},{"./EditableRegionController":1,"./EditableRegionsHomeController":2,"./dataService":3,"./editableRegion.component":4,"./routes":6,"./service":7}],6:[function(require,module,exports){
(function() {
    'use strict';

    angular.module('mcms.frontEnd.editableRegions')
        .config(config);

    config.$inject = ['$routeProvider','FRONTEND_CONFIG'];

    function config($routeProvider,Config) {

        $routeProvider
            .when('/front/editableRegions', {
                templateUrl:  Config.templatesDir + 'EditableRegions/index.html',
                controller: 'EditableRegionsHomeController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                resolve: {
                    Regions : ["AuthService", '$q', 'EditableRegionService', function (ACL, $q, ERS) {
                        return (!ACL.role('admin')) ? $q.reject(403) : ERS.init();
                    }]
                },
                name: 'editable-regions-home'
            })
            .when('/front/editableRegions/:id', {
                templateUrl:  Config.templatesDir + 'EditableRegions/edit.html',
                controller: 'EditableRegionController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                resolve: {
                    Region : ["AuthService", '$q', 'EditableRegionService', '$route', function (ACL, $q, ERS, $route) {
                        return (!ACL.role('admin')) ? $q.reject(403) : ERS.region($route.current.params.id);
                    }]
                },
                name: 'edit-editable-region'
            });
    }


})();

},{}],7:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('mcms.frontEnd.editableRegions')
        .service('EditableRegionService',Service);

    Service.$inject = ['lodashFactory', 'LangService', 'EditableRegionDataService', '$q', 'ItemSelectorService'];

    function Service(lo, Lang, DS, $q, ItemSelector) {
        var _this = this,
            Regions = [];

        this.init = init;
        this.region = region;
        this.update = update;


        function init() {
            return DS.index().then(function (response) {
                Regions = response.regions;
                ItemSelector.register(response.connectors);
                return Regions;
            });
        }

        function region(id) {

            if (Regions.length == 0) {
                return init()
                    .then(function (r) {
                        return region(id);
                    });
            }

            return $q.resolve(lo.find(Regions, {name : id}));

        }

        function regions() {
            return Regions;
        }

        function update(id, region) {
            return DS.update(id, region);
        }

    }
})();

},{}],8:[function(require,module,exports){
(function() {
    'use strict';

    angular.module('mcms.frontEnd.frontPage')
        .controller('FrontPageHomeController',Controller);

    Controller.$inject = [];

    function Controller() {
        var vm = this;

    }

})();

},{}],9:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('mcms.frontEnd.frontPage')
        .service('FrontPageDataService',Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var _this = this;
        var baseUrl = '/admin/api/front-page/';



        function returnData(response) {
            return response.data;
        }
    }
})();

},{}],10:[function(require,module,exports){
(function(){
    'use strict';

    angular.module('mcms.frontEnd.frontPage', [])
        .run(run);

    run.$inject = ['mcms.menuService'];

    function run(Menu) {

    }
})();

require('./routes');
require('./dataService');
require('./service');
require('./FrontPageHomeController');

},{"./FrontPageHomeController":8,"./dataService":9,"./routes":11,"./service":12}],11:[function(require,module,exports){
(function() {
    'use strict';

    angular.module('mcms.frontEnd.frontPage')
        .config(config);

    config.$inject = ['$routeProvider','FRONTEND_CONFIG'];

    function config($routeProvider,Config) {

        $routeProvider
            .when('/front/frontPage', {
                templateUrl:  Config.templatesDir + 'FrontPage/index.html',
                controller: 'FrontPageHomeController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                resolve: {
                    init : ["AuthService", '$q', 'FrontPageService', function (ACL, $q, FrontPage) {
                        return (!ACL.role('admin')) ? $q.reject(403) : FrontPage.init();
                    }]
                },
                name: 'front-page-home'
            });
    }

})();

},{}],12:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('mcms.frontEnd.frontPage')
        .service('FrontPageService',Service);

    Service.$inject = ['FrontPageDataService', 'LangService', 'lodashFactory', '$q'];

    function Service(DS, Lang, lo, $q) {
        var _this = this;
        this.init = init;


        function init() {

            return $q.resolve([]);
        }

    }
})();

},{}],13:[function(require,module,exports){
(function(){
    'use strict';

    angular.module('mcms.frontEnd.layoutManager', [])
        .run(run);

    run.$inject = ['LayoutManagerService'];

    function run(LMS) {
        if (typeof window.Layouts != 'undefined'){
            LMS.init(window.Layouts);
        }
    }
})();

require('./service');


},{"./service":14}],14:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('mcms.frontEnd.layoutManager')
        .service('LayoutManagerService',Service);

    Service.$inject = ['lodashFactory'];

    function Service(lo) {
        var _this = this,
            Layouts = [],
            appliedFilter = null;

        this.init = init;
        this.layouts = layouts;
        this.setModel = setModel;
        this.toObj = toObj;

        function init(layouts) {
            Layouts = layouts;
        }

        function setModel(model) {
            if (typeof model.settings.Layout !='undefined' && model.settings){
                return;
            }

            if (typeof model.settings == 'undefined' || lo.isArray(model.settings)){
                model.settings = {};
            }

            model.settings.Layout = {
                id : null,
                settings : {}
            };

            return _this;
        }

        function layouts(filter) {
            if (!filter || typeof filter == 'undefined'){
                return Layouts;
            }

            var ret = [];
            appliedFilter = filter;
            //we need to check which layouts actually have the area property and filter them out
            lo.forEach(Layouts, function (item) {
                if (typeof item.area != 'undefined' && item.area){
                    if (typeof item.area == 'string' && item.area != filter){
                        return
                    }

                    if (lo.isArray(item.area) && item.area.indexOf(filter) == -1){
                        return;
                    }
                }

                ret.push(item);
            });

            return ret;
        }

        function toObj() {
            var obj = {},
                layouts = _this.layouts(appliedFilter);

            for (var i in layouts){
                obj[layouts[i].varName] = layouts[i];
            }

            return obj;
        }
    }
})();

},{}],15:[function(require,module,exports){
(function() {
    'use strict';

    angular.module('mcms.frontEnd.permalinkArchive')
        .controller('PermalinkArchiveHomeController',Controller);

    Controller.$inject = ['Items', 'PermalinkArchiveService', 'core.services', 'configuration'];

    function Controller(Items, PAS, Helpers, Config) {
        var vm = this;

        vm.ValidationMessagesTemplate = Config.validationMessages;
        vm.Items = Items;
        vm.newItem = PAS.newItem();

        vm.edit = function (id) {
            vm.editNow = id;
        };

        vm.save = function (item, $index) {
            PAS.save(item)
                .then(function () {
                    vm.editNow = null;
                    Helpers.toast('Saved!');
                });

        };

        vm.add = function () {
            PAS.save(vm.newItem)
                .then(function (items) {
                    vm.newItem = PAS.newItem();
                    vm.Items = items;
                    Helpers.toast('Saved!');
                });
        };


        vm.delete = function (item, $index) {
            Helpers.confirmDialog({}, {})
                .then(function () {
                    PAS.destroy(item).then(function () {
                        vm.Items.splice($index, 1);
                        Helpers.toast('Saved!');
                    });
                });

        };
    }

})();

},{}],16:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('mcms.frontEnd.permalinkArchive')
        .service('PermalinkArchiveDataService',Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var _this = this;
        var baseUrl = '/admin/api/permalinkArchive/';

        this.index = index;
        this.update = update;
        this.index = index;
        this.store = store;
        this.show = show;
        this.update = update;
        this.destroy = destroy;

        function index() {
            return $http.get(baseUrl).then(returnData);
        }

        function store(item) {
            return $http.post(baseUrl, item)
                .then(returnData);
        }

        function show(id) {

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

},{}],17:[function(require,module,exports){
(function(){
    'use strict';

    angular.module('mcms.frontEnd.permalinkArchive', [])
        .run(run);

    run.$inject = ['mcms.menuService'];

    function run(Menu) {

    }
})();
require('./dataService');
require('./service');
require('./PermalinkArchiveHomeController');
require('./routes');

},{"./PermalinkArchiveHomeController":15,"./dataService":16,"./routes":18,"./service":19}],18:[function(require,module,exports){
(function() {
    'use strict';

    angular.module('mcms.frontEnd.permalinkArchive')
        .config(config);

    config.$inject = ['$routeProvider','FRONTEND_CONFIG'];

    function config($routeProvider,Config) {

        $routeProvider
            .when('/front/permalinkArchive', {
                templateUrl:  Config.templatesDir + 'PermalinkArchive/index.html',
                controller: 'PermalinkArchiveHomeController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                resolve: {
                    Items : ["AuthService", '$q', 'PermalinkArchiveService', function (ACL, $q, PAS) {
                        return (!ACL.role('admin')) ? $q.reject(403) : PAS.init();
                    }]
                },
                name: 'permalink-archive-home'
            });
    }


})();

},{}],19:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('mcms.frontEnd.permalinkArchive')
        .service('PermalinkArchiveService',Service);

    Service.$inject = ['lodashFactory', 'PermalinkArchiveDataService', '$q'];

    function Service(lo, DS, $q) {
        var _this = this,
            Items = [];

        this.init = init;
        this.newItem = newItem;
        this.save = save;
        this.destroy = destroy;

        function init() {
            return DS.index().then(function (response) {
                Items = response;
                return Items;
            });
        }

        function newItem() {
            return {
                old_link : '',
                new_link : ''
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

},{}],20:[function(require,module,exports){
(function(){
    'use strict';

    angular.module('mcms.frontEnd.seo', [])
        .run(run);

    run.$inject = ['mcms.menuService'];

    function run(Menu) {

    }
})();
require('./service');

/*
require('./routes');
require('./dataService');

require('./PageHomeController');
require('./PageController');
require('./editPage.component');
*/

},{"./service":21}],21:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('mcms.frontEnd.seo')
        .service('SeoService',Service);

    Service.$inject = ['lodashFactory', 'LangService'];

    function Service(lo, Lang) {
        var _this = this,
            Fields;

        this.init = init;
        this.fields = fields;
        this.prefill = prefill;
        this.fillFields = fillFields;

        function init(fields) {
            Fields = fields;
            return _this;
        }

        function fields() {
            return Fields;
        }

        function prefill(destinationModel, sourceModel, lang) {
            lo.forEach(Fields, function (field) {
                if (field.prefill && (!destinationModel[field.varName]) || typeof destinationModel[field.varName] == 'undefined'){
                    if (typeof sourceModel[field.prefill] == 'undefined' || !sourceModel[field.prefill] || typeof sourceModel[field.prefill][lang] == 'undefined'){
                        return;
                    }

                    destinationModel[field.varName] = sourceModel[field.prefill][lang].replace(/(<([^>]+)>)/ig,"");
                }
            });

            return _this;
        }

        /**
         * Responsible for creating the settings fields in multiple languages
         * Pass something like item.settings and it will create the seo object for all languages
         *
         * @param model
         * @param inject
         */
        function fillFields(model, inject) {
            var Locales = Lang.locales();
            if (lo.isArray(model) || typeof model == 'undefined' || !model){
                model = {
                    seo : {}
                };
            }

            if (typeof model.seo == 'undefined'){
                model.seo = {};
            }

            for (var key in Locales){
                if (typeof model.seo[key] == 'undefined'){
                    model.seo[key] = {};
                }

                if (typeof inject == 'function'){
                    inject.call(this, model.seo[key], key);
                }


            }
        }
    }
})();

},{}],22:[function(require,module,exports){
(function(){
    'use strict';

    angular.module('mcms.frontEnd.settings', [])
        .run(run);

    run.$inject = ['mcms.menuService'];

    function run(Menu) {

    }
})();

/*
require('./routes');
require('./dataService');
require('./service');
require('./PageHomeController');
require('./PageController');
require('./editPage.component');
*/

},{}],23:[function(require,module,exports){
(function(){
    'use strict';

    angular.module('mcms.frontEnd.widgets', [])
        .run(run);

    run.$inject = ['mcms.widgetService'];

    function run(Widget) {
        Widget.registerWidget(Widget.newWidget({
            id : 'welcome',
            title : 'Things to do',
            template : '<welcome-widget></welcome-widget>',
            settings : {}
        }));
    }
})();

require('./welcome.widget');
},{"./welcome.widget":24}],24:[function(require,module,exports){
(function(){
    'use strict';

    angular.module('mcms.frontEnd.widgets')
        .directive('welcomeWidget', Component);

    Component.$inject = ['FRONTEND_CONFIG', '$filter'];

    function Component(Config, $filter){

        return {
            templateUrl: Config.templatesDir + "Widgets/welcome.widget.html",
            restrict : 'E',
            link : function(scope, element, attrs, controllers){
                // $location.path($filter('reverseUrl')('pages-edit',{id : id}).replace('#',''));
                scope.Items = [
                    {
                        title : 'Manage your users',
                        href  : $filter('reverseUrl')('user-manager'),
                        description : 'Add/remove/edit system users'
                    },
                    {
                        title : 'Manage your menus',
                        href  : $filter('reverseUrl')('menu-manager'),
                        description : 'Add/remove/edit website menus'
                    },
                    {
                        title : 'Translate your site',
                        href  : $filter('reverseUrl')('lang'),
                        description : 'Add/remove/edit website translations'
                    }
                ];
            }
        };
    }
})();
},{}],25:[function(require,module,exports){
(function(){
    'use strict';
    var assetsUrl = '/assets/',
        appUrl = '/app/',
        componentsUrl = appUrl + 'Components/',
        templatesDir = '/front-end/app/templates/';

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
        .constant('FRONTEND_CONFIG',config);
})();
},{}],26:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('mcms.frontEnd', [
        'mcms.frontEnd.frontPage',
        'mcms.frontEnd.settings',
        'mcms.frontEnd.seo',
        'mcms.frontEnd.editableRegions',
        'mcms.frontEnd.layoutManager',
        'mcms.frontEnd.permalinkArchive',
        'mcms.frontEnd.widgets',
        'mcms.mediaFiles',
        'ngFileUpload'
    ])
        .run(run);

    run.$inject = ['mcms.menuService'];



    function run(Menu) {

        Menu.addMenu(Menu.newItem({
            id: 'FrontEnd',
            title: 'Website',
            permalink: '',
            icon: 'web',
            order: 5,
            acl: {
                type: 'role',
                permission: 'admin'
            }
        }));

        var pagesMenu = Menu.find('FrontEnd');

        pagesMenu.addChildren([
            Menu.newItem({
                id: 'editableRegions-settings',
                title: 'Editable regions',
                permalink: '/front/editableRegions',
                icon: 'format_shapes',
                order : 2
            })
        ]);

/*        pagesMenu.addChildren([
            Menu.newItem({
                id: 'frontEnd-settings',
                title: 'Settings',
                permalink: '/front/settings',
                icon: 'settings',
                order : 3
            })
        ]);*/

        pagesMenu.addChildren([
            Menu.newItem({
                id: 'permalink-archive',
                title: '301 Redirects',
                permalink: '/front/permalinkArchive',
                icon: 'link',
                order: 4
            })
        ]);
    }

})();

require('./config');
require('./FrontPage');
require('./EditableRegions');
require('./Settings');
require('./Seo');
require('./LayoutManager');
require('./PermalinkArchive');
require('./Widgets');

},{"./EditableRegions":5,"./FrontPage":10,"./LayoutManager":13,"./PermalinkArchive":17,"./Seo":20,"./Settings":22,"./Widgets":23,"./config":25}]},{},[26])