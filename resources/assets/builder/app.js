(function () {
    'use strict';

    angular.module('mcms.builder', [

    ])

        .run(run);

    run.$inject = ['mcms.menuService'];

    function run(Menu) {

/*        Menu.addMenu(Menu.newItem({
            id: 'pages',
            title: 'CMS',
            permalink: '',
            icon: 'pages',
            order: 1,
            acl: {
                type: 'role',
                permission: 'admin'
            }
        }));*/

        var pagesMenu = Menu.find('FrontEnd');

        pagesMenu.addChildren([
            Menu.newItem({
                id: 'builder',
                title: 'Builder',
                permalink: '/front/build',
                icon: 'content_copy',
                order : 2
            })
        ]);
    }

})();