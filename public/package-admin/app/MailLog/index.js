(function () {
    'use strict';

    angular.module('mcms.mailLog', [])
        .run(run);

    run.$inject = ['mcms.menuService', 'mcms.widgetService'];

    function run(Menu, Widget) {
        var administratorMenu = Menu.find('administrator');
        administratorMenu.addChildren([
            Menu.newItem({
                id : 'mail-log',
                title : 'Mail Log',
                permalink : '/administrator/mailLog',
                icon : 'email',
                order : 10
            })
        ]);

        Widget.registerWidget(Widget.newWidget({
            id : 'latestMail',
            title : 'Latest Mail',
            template : '<latest-mail-widget></latest-mail-widget>',
            settings : {}
        }));
    }
})();


require('./dataService');
require('./services');
require('./routes');
require('./MailLogHomeController');
require('./mailLog.component');
require('./latestMail.widget');



