(function () {
    angular.module('mcms.user')
        .directive('editPermission', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = [ 'core.services', 'configuration', 'AuthService'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "User/Components/editPermission.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['editPermission'],
            scope: {
                options: '=?options',
                permission: '=?permission',
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true
                };


                controllers[0].init(scope.permission);
                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
            }
        };
    }

    function DirectiveController(Helpers, Config, ACL) {
        var vm = this;
        vm.Permission = {};
        vm.ValidationMessagesTemplate = Config.validationMessages;
        vm.init = function (permission) {
            vm.Permission = permission;
        };

        vm.save = function(){
            ACL.savePermission(vm.Permission)
                .then(function (result) {
                    Helpers.toast('Saved!');
                });
        }
    }
})();
