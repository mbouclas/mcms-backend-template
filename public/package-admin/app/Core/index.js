(function () {
    'use strict';
    /*
     * Module used for core components like data services, lodash and common directives
     */
    angular.module('mcms.core', [])
        .run(run);

    run.$inject = ['app.serviceProvider','mcms.menuService', 'configuration', '$templateCache','$http', '$rootScope'];

    function run(App,Menu, Config, $templateCache, $http, $rootScope) {
        $rootScope.ValidationMessagesTemplate = Config.validationMessages;
        $rootScope.Config = Config;

        Menu.addMenu(Menu.newItem({
            id : 'home',
            title : 'Home',
            permalink : '',
            icon : 'home',
            'order' : 0
        }));

        Menu.addMenu(Menu.newItem({
            id : 'administrator',
            title : 'Administrator',
            permalink : '',
            icon : 'account_circle',
            acl : {
                type : 'role',
                permission : 'admin'
            },
            order : 100
        }));
    }
})();

require('./services');
require('./factories');
require('./core.config');
require('./core.lo.directive');
require('./serviceProvider');
require('./core.filters');
require('./core.alertMessage.directive');
require('./toSlug.directive');
require('./tabSelector');
require('./compareTo.directive');
require('./moduleExtender');


