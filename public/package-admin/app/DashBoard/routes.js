(function() {
    'use strict';

    angular.module('mcms.dashBoard')
        .config(config);

    config.$inject = ['$routeProvider','configuration'];

    function config($routeProvider,Config) {
        $routeProvider
            .when('/', {
                templateUrl:  Config.templatesDir + 'dashboard.html',
                controller: 'DashBoardController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                name: 'dashBoard'
            });
    }
})();