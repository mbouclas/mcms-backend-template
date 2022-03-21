(function () {
    angular.module('mcms.widgets')
        .directive('widgetMonitor', Directive);

    Directive.$inject = ['$rootScope', 'mcms.widgetService', 'lodashFactory', '$compile'];

    function Directive($rootScope, Widget, lo, $compile) {
        return {
            scope: {
                containers : '=containers'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {

                $rootScope.$on('widgets.rebuild', function ($event, newOrder) {
                    var widgets = Widget.renderedWidgets;
                    lo.forEach(scope.containers, function (container) {
                        var itm = $(container);
                        itm.empty();
                        scope.Cols = newOrder;
                        build(newOrder[itm.attr('id')], itm);

                    });

                    function build(items, el) {
                        var id = el.attr('id');
                        var template = '<widget-provider ' +
                            'ng-repeat="widget in Cols.' + id +'"' +
                            'item="widget" ' +
                            'class="widget" append-to="\'#' + id + '\'"></widget-provider>';
                        var newEl = angular.element(template);
                        el.append(newEl);

                        $compile(newEl)(scope);
                    }

                });
            }
        };
    }

})();
