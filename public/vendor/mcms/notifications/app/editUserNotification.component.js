(function () {
    angular.module('mcms.notifications')
        .directive('editUserNotification', Directive);

    Directive.$inject = ['NOTIFICATIONS_CONFIG', '$timeout'];
    Controller.$inject = ['$scope', 'UserNotificationService', 'configuration', 'core.services'];

    function Directive(Config, $timeout) {

        return {
            templateUrl: Config.templatesDir + "Notifications/editUserNotification.component.html",
            controller: Controller,
            controllerAs: 'VM',
            require: ['editUserNotification', 'ngModel'],
            scope: {
                options: '=?options',
                ngModel: '=ngModel',
                onSave: '&?onSave'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {};

                var watcher = scope.$watch('ngModel', function (val) {
                    if (!val) {
                        return;
                    }
                    controllers[0].setUp(scope.ngModel);
                    watcher();
                });

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
            }
        };
    }

    function Controller($scope, UserNotificationService, Config, Helpers) {

        var vm = this;
        vm.Item = [];
        vm.ValidationMessagesTemplate = Config.validationMessages;
        vm.priorityCodes = UserNotificationService.getCodes();
        vm.priorityCodesFlat = UserNotificationService.getCodes(true);
        vm.notificationTypes = UserNotificationService.notificationTypes();
        vm.notificationTypesFlat = UserNotificationService.notificationTypes(true);


        this.setUp = function (item) {
            vm.Item = item;

            if (typeof item.id == 'undefined') {
                vm.Item = UserNotificationService.newNotification();
            }
        };


        vm.save = function () {

            if (vm.Item.type != 'normal' && !vm.Item.id) {
                var userCount = (vm.Item.users.length == 0) ? 'all your users' : vm.Item.users.length + ' users';
                Helpers.confirmDialog({}, {
                    title: 'This will queue up an ' + vm.Item.type + ' notification to ' + userCount
                })
                    .then(function () {
                        save();
                    });

                return;
            }

            save();
        };

        function save() {
            UserNotificationService.save(vm.Item)
                .then(function (result) {

                    if (typeof $scope.onSave == 'function') {
                        $scope.onSave({item: result, isNew: !vm.Item.id});
                    }

                    Helpers.toast('saved!!!');
                })
        }

        vm.removeUser = function (item) {
            vm.Item.users.splice(vm.Item.users.indexOf(vm.Item.users, {id: item.id}), 1);
        };

    }
})();