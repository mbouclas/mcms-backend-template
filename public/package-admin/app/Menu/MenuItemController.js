(function () {
    'use strict';

    angular.module('mcms.menu')
        .controller('MenuItemController', Controller);

    Controller.$inject = ['items', 'MenuService', 'Dialog', 'LangService', 'core.services'];

    function Controller(Menu, MenuService, Dialog, Lang, Helpers) {
        var vm = this;
        vm.Menu = Menu;
        vm.Lang = Lang;
        vm.defaultLang = Lang.defaultLang();
        vm.Connectors = MenuService.connectors();
        vm.treeOptions = {
            dragStart: function (ev) {

            }
        };

        vm.onResult = function (newNode, parent) {
            Dialog.close();
            //send it to the db
            newNode.parent = parent;
            MenuService.addNode(newNode)
                .then(function (savedNode) {
                    //add it to the tree
                    if (parent) {
                        if (typeof parent.children == 'undefined'){
                            parent.children = [];
                        }
                        parent.children.push(savedNode);
                        return;
                    }

                    if (typeof vm.Menu.items == 'undefined'){
                        vm.Menu.items = [];
                    }

                    vm.Menu.items.push(savedNode);
                    MenuService.toFlat();//refresh the flat menu
                    Helpers.toast('Saved!');
                });


        };

        vm.add = function (node) {
            node = node || null;
            Dialog.show({
                title: (!node) ? 'Create root node' : 'Add node to "' + node.title[vm.defaultLang] + '"',
                contents: '<add-node connectors="VM.Connectors" ' +
                'add-to="VM.parentNode" ' +
                'on-result="VM.onResult(result, parent)"></add-node>',
                locals: {
                    Connectors: vm.Connectors,
                    onResult: vm.onResult,
                    parentNode: node || null
                }
            });
        };

        vm.edit = function (node) {
            Dialog.show({
                title: 'Edit "' + node.title[vm.defaultLang] + '"',
                contents: '<custom-link-connector item="VM.node" ' +
                'on-result="VM.onResult(result, parent)" parent-menu="VM.parentMenu"></custom-link-connector>',
                locals: {
                    node: node,
                    onResult: updateNode,
                    parentMenu : Menu
                }
            });

        };

        vm.delete = function (node) {
            Helpers.confirmDialog({}, {})
                .then(function () {
                    MenuService.destroyNode(node)
                        .then(function () {
                            vm.Menu = MenuService.menu();
                            Helpers.toast('Saved!');
                        });
                });
        };

        vm.save = function () {
            MenuService.rebuild()
                .then(function (newMenu) {
                    vm.Menu = newMenu;
                    Helpers.toast('Saved!');
                });
        };

        function updateNode(node) {
            return MenuService.updateNode(node).then(function (result) {
                Helpers.toast('Saved!');
            })
        }
    }


})();
