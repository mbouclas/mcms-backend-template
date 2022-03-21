(function () {
    angular.module('mcms.user')
        .directive('editRole', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = [ 'core.services', 'configuration', 'AuthService'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "User/Components/editRole.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['editRole'],
            scope: {
                options: '=?options',
                role: '=?role',
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true
                };


                controllers[0].init(scope.role);
                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
            }
        };
    }

    function DirectiveController(Helpers, Config, ACL) {
        var vm = this;
        vm.Role = {};
        vm.ValidationMessagesTemplate = Config.validationMessages;
        vm.Permissions = ACL.permissions();
        vm.init = function (role) {
            if (typeof role.permissions == 'undefined' || !role.permissions) {
                role.permissions = [];
            }

            vm.Role = role;
        };

        vm.exists = function (item, type) {
            type = (!type) ? 'checkForPermission' : 'checkFor' + type;
            return ACL[type](vm.Role.permissions, item.name);
        };

        vm.toggle = function (item, type) {
            type = (!type) ? 'togglePermission' : 'toggle' + type;
            return ACL[type](vm.Role.permissions, item);
        };

        vm.save = function(){
            ACL.saveRole(vm.Role)
                .then(function (result) {
                    Helpers.toast('Saved!');
                });
        }
    }
})();
