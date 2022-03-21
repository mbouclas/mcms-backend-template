(function () {
    'use strict';

    angular.module('mcms.mediaLibrary', [])
        .run(run);

    run.$inject = ['mcms.menuService'];

    function run(Menu) {
        var frontEndMenu = Menu.find('FrontEnd');
        Menu.addMenu(Menu.newItem({
            id: 'media-library',
            title: 'Media Library',
            permalink: '/mediaLibrary',
            icon: 'photo_library',
            order: 6,
            acl: {
                type: 'role',
                permission: 'admin'
            }
        }));
    }

})();

require('./routes');
require('./dataService');
require('./services');
require('./mediaLibrary.component');
require('./mediaLibraryEditor.component');
require('./mediaLibraryContents.component');
require('./MediaLibraryHomeController');
require('./editMediaLibraryItem.component');

