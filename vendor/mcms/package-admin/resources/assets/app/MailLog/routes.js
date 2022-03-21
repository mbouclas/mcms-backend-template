(function() {
    'use strict';

    angular.module('mcms.mailLog')
        .config(config);

    config.$inject = ['$routeProvider','configuration'];

    function config($routeProvider,Config) {

        $routeProvider
            .when('/administrator/mailLog', {
                templateUrl:  Config.templatesDir + 'MailLog/index.html',
                controller: 'MailLogHomeController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                resolve: {
                    log : ["AuthService", '$q', 'MailLogService', function (ACL, $q, MailLogService) {
                        return (!ACL.inGates('mailLog.menu')) ? $q.reject(403) : MailLogService.get();
                    }]
                },
                name: 'mail-log'
            });
    }

})();
