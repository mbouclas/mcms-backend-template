(function() {
    'use strict';

    angular.module('mcms.user')
        .controller('UsersController',Controller);

    Controller.$inject = ['AuthService', 'configuration', 'lodashFactory', '$route', 'ModuleExtender'];

    function Controller(ACL, Config, lo, $route, ModuleExtender, Helpers) {
        var vm = this;

        vm.components = [
            {
                label : 'Users',
                file : Config.templatesDir + 'User/tab-user-list.html',
                active : true,
                default : true,
                id : 'userList'
            },
            {
                label : 'Roles',
                file : Config.templatesDir + 'User/tab-roles.html',
                active : false,
                id : 'roleList',
                acl : 'isSu'
            },
            {
                label : 'Permissions',
                file : Config.templatesDir + 'User/tab-permissions.html',
                active : false,
                id : 'permissionList',
                acl : 'isSu'
            },
            {
                label : 'Profiles',
                file : Config.templatesDir + 'User/tab-profiles.html',
                active : false,
                id : 'userProfiles',
                acl : 'isSu'
            },
            {
                label : 'Extra Fields',
                file : Config.templatesDir + 'User/tab-extra-fields.html',
                active : false,
                id : 'userExtraFields',
                acl : 'isSu'
            },
        ];

        vm.components = ModuleExtender.extend('users', vm.components);

        vm.ComponentLoaded = lo.find(vm.components, {id : $route.current.locals.component});

    }


})();
