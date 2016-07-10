(function () {
    angular.module('mcms.user')
        .directive('userList', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'UserService','core.services',
        '$mdBottomSheet', 'configuration', 'Dialog', 'BottomSheet'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "User/Components/userList.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['userList'],
            scope: {
                options: '=?options',
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true
                };

                // controllers[0].set(scope.item);

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
            }
        };
    }

    function DirectiveController($scope, User, Helpers, $mdBottomSheet, Config, Dialog, BottomSheet) {
        var vm = this;

        vm.filters = {};
        vm.Users = [];
        vm.Pagination = {};

        vm.showActions = function (ev, user) {
            BottomSheet.show({
                item : user,
                title : 'Edit ' + user.email
            },[
                { name: 'Edit', icon: 'edit', fn : vm.edit },
                { name: 'Disable', icon: 'block', fn : vm.disable },
                { name: 'Delete', icon: 'delete', fn : vm.delete },
            ]);

        };

        vm.onSave = function (user, isNew) {
            if (isNew){
                Dialog.close();
                filter();//fetch everything again
            }
        };

        vm.edit = function (user) {
            if (!user){
                user = User.newUser();
            }

            Dialog.show({
                title : (!user.id) ? 'Create user' : 'Edit ' + user.email,
                contents : '<edit-user user="VM.User" on-save="VM.onSave(user, isNew)"></edit-user>',
                locals : {
                    User :user,
                    onSave : vm.onSave
                }
            });
        };

        vm.info = function (user) {
          //show the user info
        };

        vm.disable = function (user) {
            //disable the user
            Helpers.confirmDialog({}, {
                text : 'Disabling the user will prevent them from logging in'
            })
                .then(function () {
                    // disable user here
                });
        };

        vm.delete = function (user) {
            Helpers.confirmDialog({}, {})
                .then(function () {
                    User.destroy(user)
                        .then(function () {
                            filter();
                        });
                });
        };

        filter();

        function filter() {
            return User.get(vm.filters)
                .then(function (res) {
                    vm.Users = res.data;
                    vm.Pagination = res;
                });
        }

    }
})();
