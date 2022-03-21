(function() {
    'use strict';

    angular.module('mcms.user')
        .controller('UserActionsController',Controller);

    Controller.$inject = ['$mdBottomSheet'];

    function Controller($mdBottomSheet) {
        var vm = this;
       
        vm.listItemClick = function($index) {
            $mdBottomSheet.hide(clickedItem);
        };
    }

})();
