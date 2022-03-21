(function () {
    angular.module('mcms.user')
        .directive('userList', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'UserService','core.services',
        '$mdBottomSheet', 'configuration', 'Dialog', 'BottomSheet', '$mdSidenav', 'AuthService'];

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
                    showToolbar: true,
                    limit : 10
                };

                // controllers[0].set(scope.item);

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
            }
        };
    }

    function DirectiveController($scope, User, Helpers, $mdBottomSheet, Config, Dialog, BottomSheet, $mdSidenav, ACL) {
        var vm = this,
            Filters = {
                email: null,
                description: null,
                description_long: null,
                active: null,
                userId: null,
                dateStart: null,
                dateEnd: null,
                category_ids : [],
                dateMode: 'created_at',
                orderBy : 'created_at',
                role : null,
                permission : null,
                way : 'DESC',
                page: 1,
                limit :  10
            };
        Filters.limit = (typeof $scope.options != 'undefined' && typeof $scope.options.limit != 'undefined') ? $scope.options.limit : Filters.limit;
        vm.boolValues = [
            {
                label: 'Don\'t care',
                value: null
            },
            {
                label: 'Yes',
                value: true
            },
            {
                label: 'No',
                value: false
            }
        ];
        vm.Roles = ACL.roles();
        vm.Permissions = ACL.permissions();

        Helpers.clearLocation($scope);
        resetFilters();

        vm.Users = [];
        vm.Pagination = {};

        vm.showActions = function (ev, user) {
            var toggle = (user.active) ?
            { name: 'Disable', icon: 'block', fn : vm.disable } :
            { name: 'Enable', icon: 'done', fn : vm.enable };

            BottomSheet.show({
                item : user,
                title : 'Edit ' + user.email
            },[
                { name: 'Edit', icon: 'edit', fn : vm.editRedirect },
                { name: 'Quick edit', icon: 'edit', fn : vm.edit },
                toggle,
                { name: 'Delete', icon: 'delete', fn : vm.delete },
            ]);

        };

        vm.onSave = function (user, isNew) {
            if (isNew){
                Dialog.close();
                filter();//fetch everything again
            }
        };

        vm.changePage = function (page, limit) {
            vm.filters.page = page;
            filter();
        };

        vm.applyFilters = function () {
            vm.filters.page = 1;
            filter();
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

        vm.editRedirect = function (user) {
            return Helpers.redirectTo('edit-user', {id : user.id});
        };

        vm.info = function (user) {
          //show the user info
        };

        vm.enable = function (user) {
            user.active = true;
            User.save(user)
                .then(function (result) {
                    Helpers.toast('Saved!');
                });
        };

        vm.disable = function (user) {
            //disable the user
            Helpers.confirmDialog({}, {
                text : 'Disabling the user will prevent them from logging in'
            })
                .then(function () {
                    user.active = false;
                    User.save(user)
                        .then(function (result) {
                            Helpers.toast('Saved!');
                        });
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

        vm.toggleFilters = function () {
            $mdSidenav('filters').toggle();
        };

        filter();

        function filter() {
            return User.get(vm.filters)
                .then(function (res) {
                    vm.Users = res.data;
                    vm.Pagination = res;
                });
        }

        vm.resetFilters = function () {
            resetFilters();
            filter();
        };

        function resetFilters() {
            vm.filters = angular.copy(Filters);
        }

    }
})();
