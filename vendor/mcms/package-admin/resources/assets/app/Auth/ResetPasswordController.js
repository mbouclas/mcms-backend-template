(function() {
    'use strict';

    angular.module('mcms.auth')
        .controller('ResetPasswordController',Controller);

    Controller.$inject = ['$routeParams', '$location', '$rootScope', 'UserService', 'configuration'];

    function Controller($routeParams, $location, $rootScope, UserService, Config) {
        var vm = this;
        vm.Login = {
            email : '',
            token : $routeParams.token,
            password : ''
        }
        vm.ValidationMessagesTemplate = Config.validationMessages;
        vm.error = [];

        vm.reset = function () {
            UserService.resetPassword(vm.Login)
                .then(function (response) {
                    if (response.success) {
                        return $location.path('/login');
                    }

                    if (!response.success) {
                        vm.error.push((response.reason == 'noUser') ? 'Invalid user' : 'Invalid token');
                    }

                })
                .catch(function (error) {
                    for (var i in error.data){
                        for (var j in error.data[i]){
                            vm.error.push(error.data[i][j]);
                        }
                    }
                });
        }
    }

})();
