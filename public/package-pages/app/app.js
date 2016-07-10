(function () {
    'use strict';

    angular.module('mcms.pages', [
        'mcms.mediaFiles',
        'mcms.extraFields',
        'mcms.pages.page',
        'mcms.pages.pageCategory',
        'ngFileUpload'
    ])

        .run(run);

    run.$inject = ['mcms.menuService'];

    function run(Menu) {

        Menu.addMenu(Menu.newItem({
            id: 'pages',
            title: 'Pages',
            permalink: '',
            icon: 'pages',
            order: 1,
            acl: {
                type: 'role',
                permission: 'admin'
            }
        }));

        var pagesMenu = Menu.find('pages');

        pagesMenu.addChildren([
            Menu.newItem({
                id: 'pages-manager',
                title: 'Content',
                permalink: '/pages/content',
                icon: 'content_copy',
                order : 2
            })
        ]);

        pagesMenu.addChildren([
            Menu.newItem({
                id: 'pagesCategories-manager',
                title: 'Categories',
                permalink: '/pages/categories',
                icon: 'view_list',
                order : 1
            })
        ]);
    }

})();

require('./config');
require('./Page');
require('./PageCategory');