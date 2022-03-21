(function() {
    'use strict';

    angular.module('mcms.user')
        .config(config);

    config.$inject = ['$routeProvider','configuration'];

    function config($routeProvider,Config) {

        $routeProvider
            .when('/administrator/users', {
                templateUrl:  Config.templatesDir + 'User/index.html',
                controller: 'UsersController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                resolve: {
                    acl : ["AuthService", '$q', function (ACL, $q) {
                        return (!ACL.inGates('users.menu.list')) ? $q.reject(403) : $q.resolve();
                    }],
                    component : [function () {
                        return 'userList'
                    }]
                },
                name: 'user-list'
            })
            .when('/administrator/users/:id', {
                templateUrl:  Config.templatesDir + 'User/edit.html',
                controller: 'UsersEditController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                resolve: {
                    User : ["AuthService", '$q', '$route', 'UserService', function (ACL, $q, $route, UserService) {
                        return (!ACL.inGates('users.edit')) ? $q.reject(403) : UserService.find($route.current.params.id);
                    }]
                },
                name: 'edit-user'
            })
            .when('/administrator/user/roles', {
                templateUrl:  Config.templatesDir + 'User/index.html',
                controller: 'UsersController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                resolve: {
                    acl : ["AuthService", '$q', function (ACL, $q) {
                        return (!ACL.inGates('users.menu.roles')) ? $q.reject(403) : $q.resolve();
                    }],
                    component : [function () {
                        return 'roleList'
                    }]
                },
                name: 'user-roles'
            })
            .when('/administrator/user/permissions', {
                templateUrl:  Config.templatesDir + 'User/index.html',
                controller: 'UsersController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                resolve: {
                    acl : ["AuthService", '$q', function (ACL, $q) {
                        return (!ACL.inGates('users.menu.permissions')) ? $q.reject(403) : $q.resolve();
                    }],
                    component : [function () {
                        return 'permissionList'
                    }]
                },
                name: 'user-permissions'
            })
            .when('/administrator/user/profiles', {
                templateUrl:  Config.templatesDir + 'User/index.html',
                controller: 'UsersController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                resolve: {
                    acl : ["AuthService", '$q', function (ACL, $q) {
                        return (!ACL.inGates('users.menu.profiles')) ? $q.reject(403) : $q.resolve();
                    }],
                    component : [function () {
                        return 'userProfiles'
                    }]
                },
                name: 'user-profiles'
            })
            .when('/administrator/user/extraFields', {
                templateUrl:  Config.templatesDir + 'User/index.html',
                controller: 'UsersController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                resolve: {
                    acl : ["AuthService", '$q', function (ACL, $q) {
                        return (!ACL.inGates('users.menu.extraFields')) ? $q.reject(403) : $q.resolve();
                    }],
                    component : [function () {
                        return 'userExtraFields'
                    }]
                },
                name: 'user-extra-fields'
            });
    }

})();
