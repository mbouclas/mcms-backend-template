(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
    'use strict';

    angular.module('mcms.frontEnd.frontPage')
        .controller('FrontPageHomeController',Controller);

    Controller.$inject = [];

    function Controller() {
        var vm = this;

    }

})();

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./FrontPageHomeController":1,"./dataService":2,"./routes":4,"./service":5}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('mcms.frontEnd', [
        'mcms.frontEnd.frontPage',
        'mcms.frontEnd.settings',
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
                id: 'front-page',
                title: 'Front page',
                permalink: '/front/frontPage',
                icon: 'line_style',
                order : 1
            })
        ]);

        pagesMenu.addChildren([
            Menu.newItem({
                id: 'frontEnd-settings',
                title: 'Settings',
                permalink: '/front/settings',
                icon: 'settings',
                order : 2
            })
        ]);
    }

})();

require('./config');
require('./FrontPage');
require('./Settings');

},{"./FrontPage":3,"./Settings":6,"./config":8}],8:[function(require,module,exports){
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
},{}]},{},[7]);
