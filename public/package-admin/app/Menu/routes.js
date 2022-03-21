(function() {
    'use strict';

    angular.module('mcms.menu')
        .config(config);

    config.$inject = ['$routeProvider','configuration'];

    function config($routeProvider,Config) {
        $routeProvider
            .when('/administrator/menus', {
                templateUrl: Config.templatesDir + 'Menu/index.html',
                controller: 'MenuController',
                controllerAs: 'VM',
                resolve: {
                    init : ["AuthService", 'MenuService', function (ACL, Menu) {
                        return (!ACL.inGates('menu.menu')) ? $q.reject(403) : Menu.get();
                    }]
                },
                name: 'menu-manager'
            })
            .when('/administrator/menus/:id', {
                templateUrl: Config.templatesDir + 'Menu/menu.html',
                controller: 'MenuItemController',
                controllerAs: 'VM',
                resolve: {
                    items : ["AuthService", 'MenuService', '$route', function (ACL, Menu, $route) {
                        return (!ACL.inGates('menu.menu')) ? $q.reject(403) : Menu.find($route.current.params.id);
                    }]
                },
                name: 'menu-manager-item'
            });

    }

})();
