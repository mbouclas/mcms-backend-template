(function() {
    'use strict';

    angular.module('mcms.notifications')
        .config(config);

    config.$inject = ['$routeProvider','NOTIFICATIONS_CONFIG'];

    function config($routeProvider,Config) {
        $routeProvider
            .when('/notifications', {
                templateUrl:  Config.templatesDir + 'Notifications/index.html',
                controller: 'NotificationsHomeController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                resolve: {
                    items : ["AuthService", '$q', 'UserNotificationService', function (ACL, $q, Notification) {
                        return (!ACL.level(5)) ? $q.reject(403) : Notification.get();
                    }]
                },
                name: 'user-notifications-home'
            })
            .when('/notifications/:id', {
                templateUrl:  Config.templatesDir + 'Notifications/edit.html',
                controller: 'NotificationsEditController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                resolve: {
                    item : ["AuthService", '$q', 'UserNotificationService', '$route', function (ACL, $q, Notification, $route) {
                        return (!ACL.level(5)) ? $q.reject(403) : Notification.find($route.current.params.id);
                    }]
                },
                name: 'notification-edit'
            });
    }

})();
