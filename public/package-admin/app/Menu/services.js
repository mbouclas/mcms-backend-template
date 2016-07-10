(function () {
    'use strict';

    angular.module('mcms.menu')
        .service('mcms.menuService',Service);

    Service.$inject = ['lodashFactory', 'AuthService'];
    //We need to be able to $inject a new module to the main.
    //Also, we need to be able to register routes?
    function Service(lo, ACL) {
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

        function get() {
            return _this.Menu;
        }

        function addMenu(menu) {
            _this.Menu.push(menu);
            //sort
            _this.Menu = lo.orderBy(_this.Menu, ['order', 'title'] , ['asc', 'asc']);
        }

        function addMenuItem(item) {

        }

        function addNode(node) {

        }

        function render() {

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

                var temp = new MenuTemplate();
                parent = parent || this;

                temp.parent = parent.id;
                temp.ancestors = angular.copy(parent.ancestors);
                temp.ancestors.push(parent.id);
                var menu = angular.extend(temp,child);
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
