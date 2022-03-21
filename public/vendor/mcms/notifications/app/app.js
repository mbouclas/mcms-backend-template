(function () {
    'use strict';

    angular.module('mcms.notifications', [])
        .run(run);

    run.$inject = ['mcms.menuService', 'UserNotificationService'];


    function run(Menu, UserNotificationService) {
        UserNotificationService.getConfig();
        Menu.addMenu(Menu.newItem({
            id: 'notifications',
            title: 'Notifications',
            permalink: '/notifications',
            icon: 'notifications',
            order: 2,
            acl: {
                type: 'level',
                permission: 2
            }
        }));
    }
})();

require('./config');
require('./routes');
require('./dataService');
require('./services');
require('./NotificationsHomeController');
require('./NotificationsEditController');
require('./editUserNotification.component.js');
