(function () {
    'use strict';

    angular.module('mcms.settingsManager', [])
        .run(run);

    run.$inject = ['mcms.menuService'];

    function run(Menu) {
        var administratorMenu = Menu.find('administrator');
        administratorMenu.addChildren([
            Menu.newItem({
                id : 'settings-manager',
                title : 'Settings',
                permalink : '/administrator/settings',
                icon : 'settings',
                order : 100
            })
        ]);

    }

})();

require('./services');
require('./renderSettings.component');
require('./SettingsManagerController');
require('./routes');
