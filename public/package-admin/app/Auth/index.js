(function () {
    'use strict';

    angular.module('mcms.auth', [])
        .config(config)
        .factory('responseObserver', responseObserver)
        .run(run);

    config.$inject = ['$httpProvider'];
    run.$inject = ['$rootScope', 'AuthService', '$window', '$location'];
    responseObserver.$inject = ['$q', '$log', '$location'];

    function config($httpProvider) {
        $httpProvider.interceptors.push('responseObserver');
    }

    function run($rootScope, ACL, $window, $location) {
        $rootScope.ACL = ACL;
        //In case we have a user on the window object (came from the template)
        if (typeof $window.user != 'undefined' && $window.user) {
            ACL.assignUser($window.user);
        }

        if (typeof $window.ACL != 'undefined' && $window.ACL) {
            ACL.attachRoles($window.ACL.roles);
            ACL.attachPermissions($window.ACL.permissions);
        }

        /**
         * Check if the user is logged in, otherwise redirect to login
         */
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            if (!ACL.isLoggedIn()) {
                ACL.intended = $location.url();
                $location.path('/login');
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

    function responseObserver($q, $log, $location) {
        return {
            'responseError': function (errorResponse) {
                switch (errorResponse.status) {
                    case 403:
                        ACL.logout()
                            .then(function () {
                                ACL.intended = $location.url();
                                $log.info('User logged out');
                                $location.path('/logout');
                            });
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
require('./routes');
