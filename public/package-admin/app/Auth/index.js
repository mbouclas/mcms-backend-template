(function () {
    'use strict';

    angular.module('mcms.auth', [])
        .config(config)
        .factory('responseObserver', responseObserver)
        .run(run);

    config.$inject = ['$httpProvider'];
    run.$inject = ['$rootScope', 'AuthService', '$window', '$location', 'ActiveMenu', '$route', '$http'];
    responseObserver.$inject = ['$q', '$log', '$location', '$rootScope'];

    function config($httpProvider) {
        $httpProvider.interceptors.push('responseObserver');
    }

    function run($rootScope, ACL, $window, $location, ActiveMenu, $route, $http) {
        var CurrentRoute = '';
        $rootScope.ACL = ACL;

        //In case we have a user on the window object (came from the template)
        if (typeof $window.user != 'undefined' && $window.user) {
            ACL.assignUser($window.user);
            ACL.gates($window.Gates);
        }

        if (typeof $window.ACL != 'undefined' && $window.ACL) {
            ACL.attachRoles($window.ACL.roles);
            ACL.attachPermissions($window.ACL.permissions);
        }
        var resetPath = 'password/reset/';
        /**
         * Check if the user is logged in, otherwise redirect to login
         */
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            ActiveMenu();

            if (current.indexOf(resetPath) != -1){
                event.preventDefault();
                var route = current.split('#');
                $location.path(route[1]);
                $route.reload();
                return;
            }

            if (!ACL.isLoggedIn()) {
                if (!ACL.intended && $location.url() !== '/login') {
                    ACL.intended = $location.url();
                }

                $location.path('/login');
            }

        });
        $rootScope.$on('responseObserverError', function (event, error) {
            //more requests in queue, keep going
            if ($http.pendingRequests.length !== 0) {
                return;
            }

            //avoid going in circles in case we are already in the login page
            if (error == 'loggedOut' && $location.url() !== '/login'){
                return $location.path('/logout');
            }
        });

        /**
         * If for some reason the route change was rejected, and we got a 403, redirect to home
         */
        $rootScope.$on('$routeChangeError', function(current, previous, rejection){
            if(rejection === 403){
                $location.path('/');
            }
        });
    }

    function responseObserver($q, $log, $location, $rootScope) {
        function handle403(errorResponse) {
            if (typeof errorResponse == 'object' && typeof errorResponse.data.error != 'undefined') {
                $log.info('Invalid login');
                return $q.reject(errorResponse.data);
            }

            if (errorResponse.data.indexOf('NoUser') != -1){
                $log.info('user logged out');
                $rootScope.$broadcast('responseObserverError', 'loggedOut');
                return;
            }

            $log.info('Access forbidden');
        }

        return {
            'responseError': function (errorResponse) {
                switch (errorResponse.status) {
                    case 403:
                        handle403(errorResponse);
                        break;
                    case 500:
                        $log.error(errorResponse);
                        break;
                }

                return $q.reject(errorResponse);
            }
        };
    }


})();


require('./dataService');
require('./AuthService');
require('./LoginController');
require('./LogoutController');
require('./ResetPasswordController');
require('./routes');
