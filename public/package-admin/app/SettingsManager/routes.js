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
                name: 'settings-manager'
            });

    }

})();
