(function () {
    'use strict';

    angular.module('mcms.user', [
        'md.chips.select'
    ])
        .run(run);

    run.$inject = ['mcms.menuService', 'mcms.widgetService'];

    function run(Menu, Widget) {

        Widget.registerWidget(Widget.newWidget({
            id : 'latestUsers',
            title : 'Latest users',
            gate : 'users.widget.latest',
            template : '<latest-users-widget></latest-users-widget>',
            settings : {},
            order : 10
        }));

        Menu.addMenu(Menu.newItem({
            id: 'users',
            title: 'Users',
            permalink: '',
            icon: 'supervisor_account',
            order: 98,
            gate : 'users.menu',
            acl: {
                type: 'level',
                permission: 98
            }
        }));

        var userMenu = Menu.find('users');
        userMenu.addChildren([
            Menu.newItem({
                id : 'user-list',
                title : 'List',
                permalink : '/administrator/users',
                gate : 'users.menu.list',
                icon : 'account_box',
                order : 1
            }),
            Menu.newItem({
                id : 'user-roles',
                title : 'Roles',
                gate : 'users.menu.roles',
                permalink : '/administrator/user/roles',
                icon : 'gavel',
                order : 2
            }),
            Menu.newItem({
                id : 'user-permissions',
                title : 'Permissions',
                permalink : '/administrator/user/permissions',
                gate : 'users.menu.permissions',
                icon : 'visibility',
                order : 3
            }),
            Menu.newItem({
                id : 'user-profiles',
                title : 'Profiles',
                gate : 'users.menu.profiles',
                permalink : '/administrator/user/profiles',
                icon : 'face',
                order : 4
            }),
            Menu.newItem({
                id: 'user-extra-fields',
                title: 'Extra Fields',
                gate : 'users.menu.extraFields',
                permalink: '/administrator/user/extraFields',
                icon: 'note_add',
                order : 5
            })
        ]);
    }
})();

require('./UserService');
require('./UserDataService');
require('./UsersController');
require('./UsersEditController');
require('./UserActionsController');
require('./routes');
require('./Components/userList.component');
require('./Components/editUser.component');
require('./Components/editRole.component');
require('./Components/editPermission.component');
require('./Components/permissionList.component');
require('./Components/roleList.component');
require('./Components/userSelector.component');
require('./Components/userProfiles.component');
require('./Components/userExtraFields.component');
require('./Widgets/latestUsers.widget');
require('./validateUserFieldsAsync.directive');
