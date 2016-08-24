(function(){
    'use strict';

    angular.module('mcms.frontEnd.widgets', [])
        .run(run);

    run.$inject = ['mcms.widgetService'];

    function run(Widget) {
        Widget.registerWidget(Widget.newWidget({
            id : 'welcome',
            title : 'Things to do',
            template : '<welcome-widget></welcome-widget>',
            settings : {}
        }));
    }
})();

require('./welcome.widget');