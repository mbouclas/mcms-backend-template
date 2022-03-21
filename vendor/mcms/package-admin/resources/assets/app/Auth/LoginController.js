(function() {
    'use strict';

    angular.module('mcms.auth')
        .controller('LoginController',Controller);

    Controller.$inject = ['AuthService', '$mdToast', '$location',
        '$rootScope', '$translate', '$window', 'UserService', 'configuration'];

    function Controller(ACL, $mdToast, $location, $rootScope, $translate, $window, UserService, Config) {
        var vm = this;
        vm.LostPass = {
            email : ''
        };

        vm.ValidationMessagesTemplate = Config.validationMessages;

        $translate('dashboard').then(function (res) {
        }, function (translationId) {
        });

        $rootScope.$on('login.error', function (e, error) {
           vm.errorMessage = error.message;
        });


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
                    if (typeof result == 'undefined') {
                        return;
                    }

                    var redirectTo = '/';
                    if (ACL.intended && ACL.intended != '/login'){
                        //redirect to intended
                        redirectTo = ACL.intended;
                    }
                    $location.path(redirectTo);
                    $window.location.reload();
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Log in successful!')
                            .position('bottom right')
                            .hideDelay(2000)
                    );
                })
                .catch(function (error) {
                    console.error(error);
                });
        };

        vm.resetPassword = function () {
            UserService.sendPasswordResetLink(vm.LostPass.email)
                .then(function (response) {
                    if (response === 'passwords.sent'){

                        vm.resetEmailSent = true;
                        vm.LostPass.email = '';
                    }
                });
        };
    }

})();
