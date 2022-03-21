(function() {
    'use strict';

    angular.module('mcms.settingsManager')
        .config(config);

    config.$inject = ['$routeProvider','configuration'];

    function config($routeProvider,Config) {

        $routeProvider
            .when('/administrator/settings', {
                templateUrl:  Config.templatesDir + 'SettingsManager/index.html',
                controller: 'SettingsManagerController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                resolve: {
                    init : ["AuthService", '$q', 'mcms.settingsManagerService', function (ACL, $q, SMS) {
                        return (!ACL.inGates('settings.menu')) ? $q.reject(403) : SMS.init();
                    }]
                },
                name: 'settings-manager'
            });

    }

})();
