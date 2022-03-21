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
                gate : 'mailLog.menu'
            }),
        ]);

        Widget.registerWidget(Widget.newWidget({
            id : 'latestMail',
            title : 'Latest Mail',
            template : '<latest-mail-widget></latest-mail-widget>',
            acl : {type : 'level', permission : 90},
            gate : 'mailLog.widget.latest',
            settings : {},
            order : 50
        }));
    }
})();

require('./dataService');
require('./services');
require('./routes');
require('./MailLogHomeController');
require('./mailLog.component');
require('./latestMail.widget');



