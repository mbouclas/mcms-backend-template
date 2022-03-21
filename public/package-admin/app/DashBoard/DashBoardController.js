(function() {
    'use strict';

    angular.module('mcms.dashBoard')
        .controller('DashBoardController',Controller);

    Controller.$inject = ['mcms.widgetService', 'lodashFactory', 'Dialog', '$rootScope',
        'core.services', 'UserService'];

    function Controller(Widget, lo, Dialog, $rootScope, Helpers, UserService) {
        var vm = this,
            cols = {
                left : [],
                right : []
            };


        vm.widgets = Widget.get();

        if (!lo.isNull(UserService.User.settings) && lo.isObject(UserService.User.settings.widgetPositions))
        {
            lo.forEach(UserService.User.settings.widgetPositions, function (items, pos) {
                for (var i in items){
                    cols[pos].push(lo.find(vm.widgets, {id : items[i]}));
                }
            });

            //need to find the missing ones, if any
            var missing = Widget.findMissingWidgets(UserService.User.settings.widgetPositions);
            if (missing.length > 0){
                //assign any missing to the columns
                buildDefault(missing, cols);
            }
        }
        else
        {
            //assign the widgets to the columns
            buildDefault(vm.widgets, cols);
        }

        vm.Cols = cols;
        vm.topDirections = ['left', 'up'];
        vm.bottomDirections = ['down', 'right'];
        vm.availableModes = ['md-fling', 'md-scale'];
        vm.availableDirections = ['up', 'down', 'left', 'right'];
        vm.isOpen = false;
        vm.selectedDirection = 'up';
        vm.selectedMode = vm.availableModes[1];

        vm.reorder = function () {
            Dialog.show({
                title : 'Reorder widgets',
                contents : '<reorder-widgets ng-model="VM.Model" widgets="VM.Widgets" ' +
                'on-reorder="VM.onReorder(newOrder)"></reorder-widgets>',
                locals : {
                    Widgets: vm.widgets,
                    Model: vm.Cols,
                    onReorder: vm.onWidgetsReorder
                }
            });
        };

        vm.onWidgetsReorder = function (newOrder) {
            //this will trigger the widgetMonitor to empty the canvas and recompile the widgets in the new positions
            $rootScope.$broadcast('widgets.rebuild', vm.Cols);
            //save the new order of things
            Widget.saveOrder(newOrder)
                .then(function (res) {
                    UserService.User.settings.widgetPositions = newOrder;
                    Helpers.toast('saved!!!')
                });
        };

        function buildDefault(widgets, columns) {
            //use a simple even/odd technique to assign widgets to columns
            lo.forEach(widgets, function(item, $index) {
                var col = ($index % 2) ? 'right' : 'left';
                columns[col].push(item);
            });
        }
    }



})();
