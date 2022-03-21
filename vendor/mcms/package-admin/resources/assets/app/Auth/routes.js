(function () {
    'use strict';

    angular.module('mcms.auth')
        .config(config);

    config.$inject = ['$routeProvider','configuration'];

    function config($routeProvider,Config) {

        $routeProvider
            .when('/login', {
                templateUrl:  Config.templatesDir + 'Auth/login.html',
                controller: 'LoginController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                name: 'login'
            })
            .when('/logout', {
                template: " ",
                controller: 'LogoutController',
                name: 'logout'
            })
            .when('/password/reset/:token', {
                templateUrl:  Config.templatesDir + 'User/resetPassword.html',
                controller: 'ResetPasswordController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                name: 'reset-password'
            });
    }

})();

