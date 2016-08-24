(function () {
    'use strict';

    angular.module('mcms.frontEnd', [
        'mcms.frontEnd.frontPage',
        'mcms.frontEnd.settings',
        'mcms.frontEnd.seo',
        'mcms.frontEnd.editableRegions',
        'mcms.frontEnd.layoutManager',
        'mcms.frontEnd.permalinkArchive',
        'mcms.frontEnd.widgets',
        'mcms.mediaFiles',
        'ngFileUpload'
    ])
        .run(run);

    run.$inject = ['mcms.menuService'];



    function run(Menu) {
        Menu.addMenu(Menu.newItem({
            id: 'FrontEnd',
            title: 'Website',
            permalink: '',
            icon: 'web',
            order: 5,
            acl: {
                type: 'role',
                permission: 'admin'
            }
        }));

        var pagesMenu = Menu.find('FrontEnd');

        pagesMenu.addChildren([
            Menu.newItem({
                id: 'editableRegions-settings',
                title: 'Editable regions',
                permalink: '/front/editableRegions',
                icon: 'format_shapes',
                order : 2
            })
        ]);

/*        pagesMenu.addChildren([
            Menu.newItem({
                id: 'frontEnd-settings',
                title: 'Settings',
                permalink: '/front/settings',
                icon: 'settings',
                order : 3
            })
        ]);*/

        pagesMenu.addChildren([
            Menu.newItem({
                id: 'permalink-archive',
                title: '301 Redirects',
                permalink: '/front/permalinkArchive',
                icon: 'link',
                order: 4
            })
        ]);
    }

})();

require('./config');
require('./FrontPage');
require('./EditableRegions');
require('./Settings');
require('./Seo');
require('./LayoutManager');
require('./PermalinkArchive');
require('./Widgets');
