(function () {
    'use strict';

    angular.module('mcms.menu')
        .service('mcms.menuService',Service);

    Service.$inject = ['lodashFactory', 'AuthService', '$location'];
    //We need to be able to $inject a new module to the main.
    //Also, we need to be able to register routes?
    function Service(lo, ACL, $location) {
        var _this = this;
        this.Menu = [];
        var FlatMenu = [];

        this.addMenu = addMenu;
        this.addMenuItem = addMenuItem;
        this.addNode = addNode;
        this.render = render;
        this.newItem = newItem;
        this.get = get;
        this.flat = flat;
        this.find = find;
        this.setActiveMenu = setActiveMenu;

        function get() {
            return _this.Menu;
        }

        function addMenu(menu) {
            if (!ACL.inGates(menu.gate)) {
                return _this;
            }

            _this.Menu.push(menu);
            //sort
            _this.Menu = lo.orderBy(_this.Menu, ['order', 'title'] , ['asc', 'asc']);
            return _this;
        }

        function addMenuItem(item) {

        }

        function addNode(node) {

        }

        function render() {

        }

        function setActiveMenu() {
            var flatMenu = flat();

            for (var i in flatMenu){
                if (flatMenu[i].permalink == $location.path()){
                    flatMenu[i].active = true;
                    if (flatMenu[i].parent !== 'root'){
                        //find the parent and expand it
                        var parent = lo.find(flatMenu, {id : flatMenu[i].parent});
                        parent.expand = true;
                        parent.active = true;
                    }
                }
            }
        }

        //Top level item
        function newItem(item) {
            var menu = new MenuTemplate(),
                menuItem = angular.extend(menu,item);

            menu.ancestors.push('root');
            FlatMenu.push(menu);
            return menuItem;
        }

        function MenuTemplate() {
            var _that = this;
            this.template = {
                id : '',
                title : '',
                permalink : '',
                icon : '',
                parent : 'root',
                gate : null,
                ancestors : [],
                children : [],
                acl : null,
                depth : 0,
                order : 99,
                addChild : addChild,
                addChildren : addChildren
            };

            function addChild (child,parent) {
                if (typeof parent == 'undefined' || !parent){
                    return this;
                }

                if (!ACL.inGates(child.gate)) {
                    return this;
                }

                var temp = new MenuTemplate();
                parent = parent || this;

                var menu = angular.extend(temp,child);
                menu.parent = parent.id;
                menu.ancestors = angular.copy(parent.ancestors);
                menu.ancestors.push(parent.id);
                //check for ACL
                
                _that.template.children.push(menu);
                FlatMenu.push(menu);
                return this;
            }

            function addChildren(items) {
                var parent = this;
                items.forEach(function (item) {
                    addChild(item,parent);
                });
                parent.children = lo.orderBy(parent.children, ['order', 'title'] , ['asc', 'asc']);
                return this;
            }

            return this.template;
        }

        function flat() {
            return FlatMenu;
        }

        function find(id) {
            return lo.find(FlatMenu, {id : id});
        }
    }
})();
