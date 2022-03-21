(function() {
    'use strict';

    angular.module('mcms.menu')
        .controller('MenuController',Controller);

    Controller.$inject = ['init', 'MenuService',  'BottomSheet', 'Dialog', '$location', '$filter', 'core.services'];

    function Controller(Init, Menu, BottomSheet, Dialog, $location, $filter, Helpers) {
        var vm = this;

        vm.Menus = Init;
        vm.showActions = function (ev, menu) {
            BottomSheet.show({
                item : menu,
                title : 'Edit ' + menu.title
            },[
                { name: 'Edit', icon: 'edit', fn : vm.edit },
                { name: 'Edit Menu Items', icon: 'menu', fn : vm.editItems },
                { name: 'Delete', icon: 'delete', fn : vm.delete },
            ]);
        };

        vm.edit = function (menu) {
            if (!menu){
                menu = Menu.newMenu();
            }

            Dialog.show({
                title : (!menu.id) ? 'Create menu' : 'Edit ' + menu.title,
                contents : '<edit-menu menu="VM.Menu" on-save="VM.onSave(menu, isNew)"></edit-menu>',
                locals : {
                    Menu :menu,
                    onSave : vm.onSave
                }
            });
        };

        vm.onSave = function (menu, isNew) {
            if (isNew){
                Dialog.close();
            }
        };

        vm.editItems = function (menu) {
            $location.path($filter('reverseUrl')('menu-manager-item',{id : menu.id}).replace('#',''));
        };

        vm.delete = function (menu) {
            Helpers.confirmDialog({}, {})
                .then(function () {
                    Menu.destroy(menu)
                        .then(function (menus) {
                            vm.Menus = menus;
                            Helpers.toast('Deleted');
                        });
                });
        };
    }


})();
