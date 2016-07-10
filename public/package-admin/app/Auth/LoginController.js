(function() {
    'use strict';

    angular.module('mcms.auth')
        .controller('LoginController',Controller);

    Controller.$inject = ['AuthService', '$mdToast', '$location'];

    function Controller(ACL, $mdToast, $location) {
        var vm = this;
        //user is already logged in, send him to the index
        if (ACL.isLoggedIn()){
            $location.path('/');
        }

        vm.Login = {
            email : '',
            password : '',
            remember : false
        };

        vm.login = function () {
            ACL.login(vm.Login)
                .then(function (result) {
                    var redirectTo = '/';
                    if (ACL.intended && ACL.intended != '/login'){
                        //redirect to intended
                        redirectTo = ACL.intended;
                    }
                    $location.path(redirectTo);
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Log in successful!')
                            .position('bottom right')
                            .hideDelay(2000)
                    );
                });
        };
    }

})();
