(function() {
    angular.module('mcms.widgets')
        .directive('widgetProvider', widgetProvider);

    widgetProvider.$inject = ['configuration','$compile', 'AuthService', '$rootScope', 'mcms.widgetService', 'lodashFactory'];
    widgetProviderController.$inject = ['mcms.menuService','$location'];

    function widgetProvider(Config, $compile, ACL, $rootScope, Widget, lo){

        return {
            require : 'widgetProvider',
            controller: widgetProviderController,
            controllerAs : 'VM',
            scope: {
                item : '=item',
                appendTo : '=?appendTo'
            },
            restrict : 'E',
            link : function(scope, element, attrs, controllers){
                var Me;
                $rootScope.$on('widget.rebuild', function ($event, item) {
                    build(item);
                });

                $rootScope.$on('widget.destroy', function ($event) {
                    Me.remove();
                });

                $rootScope.$on('widget.rebuild', function ($event, item) {
                    Me.remove();
                    build(item);
                });

                build(scope.item);

                function build(item) {
                    var newEl = angular.element(item.template);

                    if (!lo.isNull(item.gate) && !ACL.inGates(item.gate)){
                        return;
                    }

/*                    if (typeof item.acl != 'undefined' && item.acl && typeof item.acl == 'object'){
                        var acl = ACL[item.acl.type](item.acl.permission);
                        if (typeof acl == 'undefined' || !acl){
                            return;
                        }
                    }*/

                    if (scope.appendTo){
                        var appendTo = $(scope.appendTo);
                        appendTo.append(newEl);
                    } else {
                        element.append(newEl);
                    }
                    Me = newEl;

                    Widget.registerRenderedWidget({
                        id : item.id,
                        item : item,
                        el : Me
                    });

                    $compile(newEl)(scope);
                }
            }
        };
    }

    function widgetProviderController(Menu,$location){
        var vm = this;

    }
})();
