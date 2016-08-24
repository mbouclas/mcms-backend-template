(function() {
    'use strict';

    angular.module('mcms.mailLog')
        .controller('MailLogHomeController',Controller);

    Controller.$inject = ['log'];

    function Controller(Log) {
        var vm = this;
        vm.Log = Log;

        vm.toggleFilters = function () {
            vm.fireToggle = true;
        };
    }


})();
