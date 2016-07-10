(function () {
    'use strict';

    angular.module('mcms.user', [
        'md.chips.select'
    ])
        .run(run);

    run.$inject = ['mcms.menuService'];

    function run(Menu) {
        var administratorMenu = Menu.find('administrator');
        administratorMenu.addChildren([
            Menu.newItem({
                id : 'user-manager',
                title : 'Users',
                permalink : '/administrator/users',
                icon : 'supervisor_account',
                order : 2
            })
        ]);

    }

})();

require('./UserService');
require('./UserDataService');
require('./UsersController');
require('./UserActionsController');
require('./routes');
require('./Components/userList.component');
require('./Components/editUser.component');
require('./Components/editRole.component');
require('./Components/editPermission.component');
require('./Components/permissionList.component');
require('./Components/roleList.component');
