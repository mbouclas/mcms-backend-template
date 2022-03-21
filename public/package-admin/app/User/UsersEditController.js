(function() {
    'use strict';

    angular.module('mcms.user')
        .controller('UsersEditController',Controller);

    Controller.$inject = ['User', 'core.services'];

    function Controller(User, Helpers) {
        var vm = this;

        vm.User = User;

        vm.onSave = function (user, isNew) {
            if (isNew){
                return Helpers.redirectTo('edit-user', {id : user.id});
            }
        };

    }


})();
