(function () {
    'use strict';

    angular.module('mcms.widgets')
        .service('mcms.widgetService', Service);

    Service.$inject = ['UserDataService', 'lodashFactory', 'AuthService'];

    function Service(DS, lo, ACL) {
        var _this = this;
        this.widgets = [];
        this.renderedWidgets = [];
        var template = {
            id : '',
            title : '',
            template : '',
            gate : null,
            icon : '',
            acl : null,
            order : 0,
            settings : {}
        };

        this.get = get;
        this.newWidget = newWidget;
        this.registerWidget = registerWidget;
        this.registerWidgets = registerWidgets;
        this.registerRenderedWidget = registerRenderedWidget;
        this.destroyRenderedWidget = destroyRenderedWidget;
        this.saveOrder = saveOrder;
        this.findMissingWidgets = findMissingWidgets;


        function get() {
            return lo.orderBy(_this.widgets, ['order', 'id'] , ['asc', 'asc']);
        }

        function newWidget(widget) {
            return angular.extend(angular.copy(template),widget);
        }

        function registerWidget(widget){
            if (widget.gate && !ACL.inGates(widget.gate, false)){
                return _this;
            }

            _this.widgets.push(widget);
            return _this;
        }

        function registerWidgets(widgets){

            for (var i in widgets){
                registerWidget(widgets[i]);
            }

            return _this;
        }

        function registerRenderedWidget(widget) {
            _this.renderedWidgets.push(widget);
            return _this;
        }

        function destroyRenderedWidget(widget) {
            _this.renderedWidgets.splice(_this.renderedWidgets.indexOf(widget), 1);

            return _this;
        }

        function saveOrder(widgets) {
            var positions = {};
            lo.forEach(widgets, function (pos, key) {
                positions[key] = [];
                for (var i in pos){
                    positions[key].push(pos[i].id);
                }

            });
            return DS.saveWidgetPositions(positions);
        }

        //expecting object {left:[],right:[]}
        function findMissingWidgets(toCompare) {
            //flatten incoming widgets object
            var flat = [],
                existing = lo.map(_this.widgets, function (item) {
                    return item.id;
                });

            for (var pos in toCompare){
                for (var i in toCompare[pos]){
                    flat.push(toCompare[pos][i]);
                }
            }

           var missing = lo.difference(existing, flat),
               ret = [];

           for (var i in missing){
               ret.push(lo.find(_this.widgets, {id : missing[i]}));
           }

           if (ret.length > 0){
               return lo.orderBy(ret, ['order', 'id'] , ['asc', 'asc']);
           }

           return ret;
        }


    }//End constructor


})();
