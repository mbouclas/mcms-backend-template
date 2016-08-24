(function () {
    'use strict';

    angular.module('mcms.menu')
        .service('MenuService',Service);

    Service.$inject = ['MenuDataService', 'core.services', 'lodashFactory'];

    function Service(DS, Helpers, lo) {
        var _this = this;
        var Menus = [],
            FlatMenu = [],
            Menu = {},
            Connectors = [customLinkConnector()];
        this.get = get;
        this.filter = filter;
        this.find = find;
        this.newMenu = newMenu;
        this.save = save;
        this.destroy = destroy;
        this.menu = menu;
        this.connectors = connectors;
        this.flat = flat;
        this.toFlat = toFlat;
        this.removeNodeFromTree = removeNodeFromTree;
        this.addNode = addNode;
        this.updateNode = updateNode;
        this.destroyNode = destroyNode;
        this.rebuild = rebuild;
        this.menus = menus;


        
        function get() {
            return DS.index()
                .then(function (response) {
                    Menus = response;

                    return response;
                });
        }

        function filter(query, connector, section) {
            return DS.filter(angular.extend({
                connector : connector,
                section : section
            },query));
        }

        function newMenu() {
            return {
                title : '',
                slug : '',
                description : '',
                items : [],
                settings : {},
                order : 99
            };
        }

        function find(id) {
            return DS.show(id)
                .then(function (result) {
                    Menu = result.menu;
                    lo.forEach(result.connectors, function (connector) {
                        if (!lo.find(Connectors, {name : connector.name})){
                            Connectors.push(connector);
                        }
                    });

                    toFlat();

                    return Menu;
                });
        }
        
        function save(menu) {
            if (!menu.id){
                return DS.store(menu)
                    .then(function (newMenu) {
                        Menus.push(newMenu);

                        return newMenu;
                    });
            }


            return DS.update(menu);
        }
        
        function destroy(menu) {
            return DS.destroy(menu.id)
                .then(function () {
                    var index = lo.findIndex(Menus, {id : menu.id});
                    Menus.splice(index, 1);
                    return Menus;
                });
        }

        function menu() {
            return Menu;
        }

        function connectors() {
            return Connectors;
        }

        function addNode(node) {
            node.menu_id = Menu.id;
            return DS.storeNode(node);
        }

        function destroyNode(node) {
            return DS.destroyNode(node.id)
                .then(function (newMenu) {
                    Menu = newMenu;
                    
                    return Menu;
                });
        }

        function updateNode(node) {
            return DS.updateNode(node);
        }

        function flat() {
            return FlatMenu;
        }

        function toFlat() {
            FlatMenu = Helpers.flattenTree(Menu.items);
        }

        function removeNodeFromTree(node) {
            var index = lo.find(FlatMenu, {id : node.id});
            FlatMenu.splice(index, 1);
        }

        function rebuild() {
            return DS.rebuild(Menu)
                .then(function (newMenu) {
                    Menu = newMenu;
                    return newMenu;
                });
        }

        function customLinkConnector() {
            return {
                name : 'Custom',
                type : 'custom',
                connector : {
                    sections : [
                        {
                            name : 'Link',
                            filters : []
                        }
                    ]
                }
            };
        }

        function menus() {
            return Menus;
        }
    }
})();
