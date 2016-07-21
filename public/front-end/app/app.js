(function () {
    'use strict';

    angular.module('mcms.frontEnd', [
        'mcms.frontEnd.frontPage',
        'mcms.frontEnd.settings',
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
                id: 'front-page',
                title: 'Front page',
                permalink: '/front/frontPage',
                icon: 'line_style',
                order : 1
            })
        ]);

        pagesMenu.addChildren([
            Menu.newItem({
                id: 'frontEnd-settings',
                title: 'Settings',
                permalink: '/front/settings',
                icon: 'settings',
                order : 2
            })
        ]);
    }

})();

require('./config');
require('./FrontPage');
require('./Settings');
