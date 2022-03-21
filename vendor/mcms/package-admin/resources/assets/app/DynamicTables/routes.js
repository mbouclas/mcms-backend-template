(function () {
    'use strict';

    angular.module('mcms.dynamicTables')
        .config(config);

    config.$inject = ['$routeProvider', 'configuration'];

    function config($routeProvider, Config) {
        $routeProvider
            .when('/dynamicTables/:module', {
                templateUrl: Config.templatesDir + 'DynamicTables/index.html',
                controller: 'DynamicTablesHomeController',
                controllerAs: 'VM',
                reloadOnSearch: false,
                resolve: {
                    init: ["AuthService", '$q', 'DynamicTableService', '$route', function (ACL, $q, DynamicTableService, $route) {
                        //need to resolve the model before hand
                        return (!ACL.role('admin')) ? $q.reject(403) : $q.resolve(DynamicTableService.mapModel($route.current.params.module));
                    }],
                    type : [function () {
                        return 'tables';
                    }]
                },
                name: 'dynamic-tables-home'
            })
            .when('/dynamicTables/add/:module', {
                templateUrl: Config.templatesDir + 'DynamicTables/index.html',
                controller: 'DynamicTablesHomeController',
                controllerAs: 'VM',
                reloadOnSearch: false,
                resolve: {
                    init: ["AuthService", '$q', 'DynamicTableService', '$route', function (ACL, $q, DynamicTableService, $route) {
                        //need to resolve the model before hand
                        return (!ACL.role('admin')) ? $q.reject(403) : $q.resolve(DynamicTableService.mapModel($route.current.params.module));
                    }],
                    type : [function () {
                        return 'add-table';
                    }]
                },
                name: 'dynamic-tables-add'
            })
            .when('/dynamicTable/:id', {
                templateUrl: Config.templatesDir + 'DynamicTables/index.html',
                controller: 'DynamicTablesHomeController',
                controllerAs: 'VM',
                reloadOnSearch: false,
                resolve: {
                    init: ["AuthService", '$q', 'DynamicTableService', '$route', function (ACL, $q, DynamicTableService, $route) {
                        return (!ACL.role('admin')) ? $q.reject(403) : $q.resolve(DynamicTableService.find($route.current.params.id));
                    }],
                    type : [function () {
                        return 'table';
                    }]
                },
                name: 'dynamic-table-edit'
            })
            .when('/dynamicTables/table/:id', {
                templateUrl: Config.templatesDir + 'DynamicTables/index.html',
                controller: 'DynamicTablesHomeController',
                controllerAs: 'VM',
                reloadOnSearch: true,
                resolve: {
                    init: ["AuthService", '$q', 'DynamicTableService', '$route', function (ACL, $q, DynamicTableService, $route) {
                        return (!ACL.role('admin')) ? $q.reject(403) : DynamicTableService.get($route.current.params.id);
                    }],
                    type : [function () {
                        return 'table-items';
                    }]
                },
                name: 'dynamic-table-items'
            })
            .when('/dynamicTables/item/:id', {
                templateUrl: Config.templatesDir + 'DynamicTables/index.html',
                controller: 'DynamicTablesHomeController',
                controllerAs: 'VM',
                reloadOnSearch: true,
                resolve: {
                    init: ["AuthService", '$q', 'DynamicTableService', '$route', function (ACL, $q, DynamicTableService, $route) {
                        return (!ACL.role('admin')) ? $q.reject(403) : DynamicTableService.find($route.current.params.id);
                    }],
                    type : [function () {
                        return 'edit-item';
                    }]
                },
                name: 'dynamic-table-item-edit'
            })
            .when('/dynamicTables/item/:module/add/:parentId', {
                templateUrl: Config.templatesDir + 'DynamicTables/index.html',
                controller: 'DynamicTablesHomeController',
                controllerAs: 'VM',
                reloadOnSearch: true,
                resolve: {
                    init: ["AuthService", '$q', 'DynamicTableService', '$route', function (ACL, $q, DynamicTableService, $route) {
                        return (!ACL.role('admin')) ?
                            $q.reject(403) :
                            DynamicTableService.addItem($route.current.params.module, $route.current.params.parentId);
                    }],
                    type : [function () {
                        return 'add-item';
                    }]
                },
                name: 'dynamic-table-item-add'
            });
    }
})();
