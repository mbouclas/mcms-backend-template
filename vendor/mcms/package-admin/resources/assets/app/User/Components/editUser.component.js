(function () {
    angular.module('mcms.user')
        .directive('editUser', Directive);

    Directive.$inject = ['configuration', '$timeout'];
    DirectiveController.$inject = [ '$scope','UserService',
        'core.services', 'configuration', 'AuthService', '$q', 'lodashFactory', 'ExtraFieldService',
        '$timeout', 'ModuleExtender'];

    function Directive(Config, $timeout) {

        return {
            templateUrl: Config.templatesDir + "User/Components/editUser.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['editUser'],
            scope: {
                options: '=?options',
                user: '=?user',
                onSave : '&?onSave'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true
                };

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
                controllers[0].init(scope.user);
            }
        };
    }

    function DirectiveController($scope, User, Helpers, Config, ACL, $q, lo, ExtraFieldService, $timeout, ModuleExtender) {
        var vm = this,
            PreviousState = {};

        vm.ValidationMessagesTemplate = Config.validationMessages;
        vm.Roles = ACL.roles();
        vm.User = {};
        vm.ProfileSettings = {};
        vm.Roles = ACL.roles();
        vm.Permissions = ACL.permissions();
        vm.isSu = ACL.level(99);//more efficient check
        vm.isAcceptable = ACL.level(2);//more efficient check
        vm.tabs = [];

/*        $timeout(function () {
            //solves an angular material tabs bug

        }, 100);*/
        vm.tabs = [
            {
                label : 'General',
                file : Config.templatesDir + 'User/Components/tab-general-info.html',
                active : true,
                default : true,
                alias : 'general',
                order : 10
            },
            {
                label : 'Roles',
                file : Config.templatesDir + 'User/Components/tab-roles.html',
                active : false,
                alias : 'roles',
                acl : 'isSu',
                order : 20
            },
            {
                label : 'Permissions',
                file : Config.templatesDir + 'User/Components/tab-permissions.html',
                active : false,
                alias : 'permissions',
                acl : 'isSu',
                order : 30
            },
            {
                label : 'Extra Fields',
                file : Config.templatesDir + 'User/Components/tab-extra-fields.html',
                active : false,
                id : 'extraFields',
                order : 45,
                acl : 'isAcceptable'
            },
            {
                label : 'Profile',
                file : Config.templatesDir + 'User/Components/tab-profile.html',
                active : false,
                alias : 'profile',
                order : 50
            },

        ];
        vm.tabs = ModuleExtender.extend('user', vm.tabs);
        vm.init = function (user) {
            if (typeof user == 'undefined' || !user || !user.id) {
                if (typeof user == 'undefined'){
                    user = User.newUser();
                }

                if (typeof $scope.options.preset !== 'undefined'){
                    user = User.prefill(user, $scope.options.preset);
                }
            }

            vm.User = user;

            if (!lo.isObject(vm.User.extra_fields)){
                vm.User.extra_fields = {};
            }
            vm.User.extra_fields = ExtraFieldService.simplifyFromMysql(user.extra_fields);
            vm.ProfileSettings = User.profileSettings();
            PreviousState = angular.copy(vm.User);
            vm.userApproved = !vm.User.awaits_moderation;
            vm.showApproved = PreviousState.awaits_moderation;
            vm.ExtraFields = User.extraFields();
        };

        vm.exists = function (item, type) {
            type = (!type) ? 'checkForPermission' : 'checkFor' + type;
            var prop = (type == 'checkForPermission') ? 'user_permissions' : 'roles';
            return ACL[type](vm.User[prop], item.name);
        };

        vm.toggle = function (item, type) {
            type = (!type) ? 'togglePermission' : 'toggle' + type;
            var prop = (type == 'togglePermission') ? 'user_permissions' : 'roles';
            return ACL[type](vm.User[prop], item);
        };

        vm.approveUser = function () {
            if (vm.User.active === false || typeof vm.User.active == 'undefined') {
                vm.User.active = true;
            }

            vm.User.awaits_moderation = !vm.userApproved;
            vm.User.active = vm.userApproved;
        }

        vm.save = function () {
            //compare active to previous state
            if (PreviousState.active !== vm.User.active){
                //if now is active
                if ((PreviousState.active === false || typeof PreviousState.active == 'undefined') && vm.User.active === true){
                    //confirm dialog on send email
/*                    confirmSendNotificationEmail()
                        .then(function () {
                            vm.User.sendNotificationOnApproval = true;
                        })
                        .then(saveUser)
                        .catch(saveUser);*/
                    saveUser();
                }
                else if (PreviousState.active === true && vm.User.active === false){
                    //confirm dialog on asking if sure
                    confirmDisableUser()
                        .then(saveUser);
                }

                return;
            }

            saveUser();
        };

        function saveUser() {
            User.save(vm.User)
                .then(function (result) {
                    Helpers.toast('Saved!');

                    if (typeof $scope.onSave == 'function'){
                        var isNew = (typeof vm.User.id == 'undefined' || !vm.User.id) ? true : false;

                        $scope.onSave({user : result, isNew : isNew});
                    }

                    PreviousState = angular.copy(result);
                });
        }

        function confirmSendNotificationEmail(){
            return Helpers.confirmDialog({}, {
                title : 'Notify user?',
                text : 'Do you want to send a notification to the user?',
                cancel : 'Nope, not nescessary.'
            });
        }

        function confirmDisableUser() {
            return Helpers.confirmDialog({}, {
                title : 'Disable user?',
                text : 'Disabling this user will prevent them from logging in',
                cancel : 'Nope, not nescessary.'
            });
        }
    }
})();
