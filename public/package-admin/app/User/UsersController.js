(function() {
    'use strict';

    angular.module('mcms.user')
        .controller('UsersController',Controller);

    Controller.$inject = ['AuthService', 'configuration', 'tabs.selector'];

    function Controller(ACL, Config, TabSelector) {
        var vm = this;
        vm.isSu = ACL.role('su');//more efficient check
        vm.tabs = [
            {
                label : 'Users',
                file : Config.templatesDir + 'User/tab-user-list.html',
                active : true,
                default : true,
                alias : 'users'
            },
            {
                label : 'Roles',
                file : Config.templatesDir + 'User/tab-roles.html',
                active : false,
                alias : 'roles',
                acl : 'isSu'
            },
            {
                label : 'Permissions',
                file : Config.templatesDir + 'User/tab-permissions.html',
                active : false,
                alias : 'permissions',
                acl : 'isSu'
            }
        ];
        var Tabs = new TabSelector('section',vm.tabs).set();
        vm.onTabChange = Tabs.change;

    }


})();
