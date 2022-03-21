(function () {
    'use strict';

    angular.module('mcms.settingsManager', [])
        .run(run);

    run.$inject = ['mcms.menuService', 'mcms.settingsManagerService'];

    function run(Menu, Settings) {
        var administratorMenu = Menu.find('administrator');
        administratorMenu.addChildren([
            Menu.newItem({
                id : 'settings-manager',
                title : 'Settings',
                permalink : '/administrator/settings',
                icon : 'settings',
                gate : 'settings.menu',
                order : 100
            })
        ]);

        if (typeof window.components != 'undefined'){
            Settings.setComponents(window.components);
        }
    }

})();

require('./dataService');
require('./siteSettingsDataService');
require('./services');
require('./renderSettings.component');
require('./settingsCreator.component');
require('./editSettingsField.component');
require('./SettingsManagerController');
require('./routes');
