(function() {
    'use strict';

    angular.module('mcms.user')
        .config(config);

    config.$inject = ['$routeProvider','configuration'];

    function config($routeProvider,Config) {

        $routeProvider
            .when('/administrator/users', {
                templateUrl:  Config.templatesDir + 'User/index.html',
                controller: 'UsersController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                resolve: {
                    acl : ["AuthService", '$q', function (ACL, $q) {
                        return (!ACL.role('admin')) ? $q.reject(403) : $q.resolve();
                    }]
                },
                name: 'user-manager'
            });
    }

})();
