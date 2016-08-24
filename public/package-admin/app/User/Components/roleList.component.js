(function () {
    angular.module('mcms.user')
        .directive('roleList', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'AuthService', 'core.services', 'Dialog', 'BottomSheet'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "User/Components/roleList.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['roleList'],
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

    function DirectiveController($scope, ACL, Helpers, Dialog, BottomSheet) {
        var vm = this;
        vm.Roles = ACL.roles();

        vm.showActions = function (ev, item) {
            BottomSheet.show({
                item : item
            },[
                { name: 'Edit', icon: 'edit', fn : vm.edit },
                { name: 'Delete', icon: 'delete', fn : vm.delete },
            ]);
        };

        vm.edit = function (item) {
            item = item || ACL.newRole();

            Dialog.show({
                title : 'Edit ' + item.name,
                contents : '<edit-role role="VM.Item"></edit-role>',
                locals : {
                    Item : item
                }
            });
        };

        vm.disable = function (item) {

        };

        vm.delete = function(item){
            Helpers.confirmDialog({}, {})
                .then(function () {
                    ACL.destroyRole(item)
                        .then(function () {
                            Helpers.toast({title : 'Deleted!'})
                        });
                });

        };
    }

})();
