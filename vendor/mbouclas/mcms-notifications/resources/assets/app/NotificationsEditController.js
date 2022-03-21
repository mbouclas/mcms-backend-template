(function() {
    'use strict';

    angular.module('mcms.notifications')
        .controller('NotificationsEditController',Controller);

    Controller.$inject = ['item', 'UserNotificationService', 'core.services'];

    function Controller(Item, UserNotificationService, Helpers) {
        var vm = this;
        vm.Item = Item;

        vm.onSave = function (item, isNew) {
            if (isNew){
                return Helpers.redirectTo('notification-edit', {id : item.id});
            }
        };

    }


})();
