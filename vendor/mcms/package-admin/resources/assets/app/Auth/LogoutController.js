(function() {
    'use strict';

    angular.module('mcms.auth')
        .controller('LogoutController',Controller);

    Controller.$inject = ['AuthService','$location','$mdToast'];

    function Controller(Auth, $location, $mdToast) {
        var vm = this;

        Auth.logout()
            .then(function (result) {
                $location.path('/');
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Logged out!')
                        .position('bottom right')
                        .hideDelay(2000)
                );
            });
    }

})();
