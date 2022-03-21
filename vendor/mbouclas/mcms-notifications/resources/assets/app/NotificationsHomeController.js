(function() {
    'use strict';

    angular.module('mcms.notifications')
        .controller('NotificationsHomeController',Controller);

    Controller.$inject = ['items', 'UserNotificationService', 'BottomSheet', '$mdSidenav',
        'Dialog', 'core.services', '$rootScope', 'lodashFactory'];

    function Controller(Items, UserNotificationService, BottomSheet, $mdSidenav, Dialog, Helpers, $rootScope, lo) {
        var vm = this;
        vm.priorityCodes = UserNotificationService.getCodes();
        vm.priorityCodesFlat = UserNotificationService.getCodes(true);
        vm.notificationTypes = UserNotificationService.notificationTypes();
        vm.notificationTypesFlat = UserNotificationService.notificationTypes(true);

        function filter() {
            vm.Loading = true;
            vm.Items = [];
            return UserNotificationService.get(vm.filters)
                .then(function (res) {
                    vm.Loading = false;
                    setUp(res);
                    $rootScope.$broadcast('scroll.to.top');
                });
        }

        vm.listItemClick = function($index) {
            $mdBottomSheet.hide(clickedItem);
        };

        vm.toggleFilters = function () {
            $mdSidenav('filters').toggle();
        };

        vm.edit = function (item) {
            Dialog.show({
                title: (typeof item == 'undefined') ? 'Create Notification' : 'Edit "' + item.title + '"',
                contents: '<edit-user-notification ng-model="VM.model" on-save="VM.onSave(item, isNew)"></edit-user-notification>',
                locals: {
                    model: item || {},
                    onSave: vm.onSave
                }
            });
        };

        vm.editRedirect = function (item) {
            return Helpers.redirectTo('notification-edit', {id : item.id});
        };

        vm.changePage = function (page, limit) {
            vm.filters.page = page;
            filter();
        };

        vm.applyFilters = function () {
            filter();
        };

        vm.delete = function (item) {
            Helpers.confirmDialog({}, {})
                .then(function () {
                    UserNotificationService.destroy(item)
                        .then(function () {
                            filter();
                            Helpers.toast('Saved!');
                        });
                });
        };

        vm.showActions = function (ev, item) {

            BottomSheet.show({
                item : item,
                title : 'Edit ' + item.title
            },[
                { name: 'Edit', icon: 'edit', fn : vm.editRedirect },
                { name: 'Quick Edit', icon: 'edit', fn : vm.edit },
                { name: 'Delete', icon: 'delete', fn : vm.delete },
            ]);
        };

        vm.onSave = function (item, isNew) {
            if (isNew){
                filter();
                Dialog.close();
                return;
            }

            var $index = lo.findIndex(vm.Items, {id : item.id});
            vm.Items[$index] = item;

        };

        setUp(Items);

        function setUp(res) {
            vm.Pagination = res;
            vm.Items = res.data;
        }
    }


})();
