(function () {
    'use strict';

    angular.module('mcms.menu', [
        'ui.tree'
    ])
        .run(run);

    run.$inject = ['mcms.menuService'];


    function run(Menu) {
        var administratorMenu = Menu.find('administrator');
        administratorMenu.addChildren([
            Menu.newItem({
                id : 'menu-manager',
                title : 'Menus',
                permalink : '/administrator/menus',
                gate : 'menu.menu',
                acl: {
                    type: 'role',
                    permission: 'admin'
                },
                icon : 'menu',
                order : 3
            })
        ]);

    }


})();

require('./services');
require('./routes');
require('./MenuDataService');
require('./MenuService');
require('./ActiveMenu');
require('./MenuController');
require('./MenuItemController');
require('./Components/editMenu.component');
require('./Components/menuConnector.component');
require('./Components/menuConnectorFilter.component');
require('./Components/addNode.component');
require('./Components/customLinkConnector.component');
