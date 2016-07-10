(function () {
    angular.module('mcms.user')
        .directive('editUser', Directive);

    Directive.$inject = ['configuration', '$timeout'];
    DirectiveController.$inject = [ '$scope','UserService',
        'core.services', 'configuration', 'AuthService'];

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
                
                controllers[0].init(scope.user);
                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
            }
        };
    }

    function DirectiveController($scope, User, Helpers, Config, ACL) {
        var vm = this;
        vm.ValidationMessagesTemplate = Config.validationMessages;
        vm.Roles = ACL.roles();
        vm.User = {};
        vm.Roles = ACL.roles();
        vm.Permissions = ACL.permissions();
        vm.isSu = ACL.role('su');//more efficient check
        vm.tabs = [
            {
                label : 'General',
                file : Config.templatesDir + 'User/Components/tab-general-info.html',
                active : true,
                default : true,
                alias : 'general'
            },
            {
                label : 'Roles',
                file : Config.templatesDir + 'User/Components/tab-roles.html',
                active : false,
                alias : 'roles',
                acl : 'isSu'
            },
            {
                label : 'Permissions',
                file : Config.templatesDir + 'User/Components/tab-permissions.html',
                active : false,
                alias : 'permissions',
                acl : 'isSu'
            }
        ];

        vm.init = function (user) {
            vm.User = user;
            console.log(user);
        };

        vm.exists = function (item, type) {
            type = (!type) ? 'checkForPermission' : 'checkFor' + type;
            return ACL[type](vm.User, item);
        };

        vm.toggle = function (item, type) {
            type = (!type) ? 'togglePermission' : 'toggle' + type;
            return ACL[type](vm.User, item);
        };

        vm.save = function () {
            User.save(vm.User)
                .then(function (result) {
                   Helpers.toast('Saved!');
                    if (typeof $scope.onSave == 'function'){
                        $scope.onSave({user : vm.User, isNew : (!vm.User.id && result.id)});
                    }
                });
        };

    }
})();
