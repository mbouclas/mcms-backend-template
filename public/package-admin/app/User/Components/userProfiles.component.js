(function () {
    angular.module('mcms.user')
        .directive('userProfiles', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'AuthService',
        'BottomSheet', 'Dialog', 'core.services', 'mcms.settingsManagerService'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "User/Components/userProfiles.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['userProfiles'],
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

    function DirectiveController($scope, ACL, BottomSheet, Dialog, Helpers, SettingsService) {
        var vm = this;
        vm.Permissions = ACL.permissions();
        vm.Settings = [];
        vm.SettingsItem = {};

        SettingsService.find('user-profiles')
            .then(function (response) {
                vm.SettingsItem = response;
                vm.Settings = response.fields;

            });

        vm.save = function () {

          SettingsService.save(vm.SettingsItem)
              .then(function () {
                  Helpers.toast('Saved!!!');
              });
        };

        vm.showActions = function (ev, item) {
            BottomSheet.show({
                item : item
            },[
                { name: 'Edit', icon: 'edit', fn : vm.edit },
                { name: 'Delete', icon: 'delete', fn : vm.delete },
            ]);
        };

        vm.edit = function (item) {
            item = item || ACL.newPermission();

            Dialog.show({
                title : 'Edit ' + item.name,
                contents : '<edit-permission permission="VM.Item"></edit-permission>',
                locals : {
                    Item : item
                }
            });
        };

        vm.delete = function(item){
            Helpers.confirmDialog({}, {})
                .then(function () {
                    ACL.destroyPermission(item)
                        .then(function () {
                            Helpers.toast({title : 'Deleted!'})
                        });
                });

        };
    }


})();
