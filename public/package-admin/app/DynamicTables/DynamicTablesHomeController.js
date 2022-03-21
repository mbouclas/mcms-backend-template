(function() {
    'use strict';

    angular.module('mcms.dynamicTables')
        .controller('DynamicTablesHomeController',Controller);

    Controller.$inject = ['init', 'type', 'DynamicTableService'];

    function Controller(Init, Type, DynamicTableService) {
        var vm = this;

        if (Type === 'tables') {
            vm.Type = 'tables';
            vm.modelName = Init;
            vm.itemsRoute = 'dynamic-table-items';
            return;
        }

        if (Type === 'add-table') {
            vm.Type = 'add-table';
            vm.modelName = Init;
            vm.Item = DynamicTableService.newTable(vm.modelName);
            return;
        }

        if (typeof Type !== 'undefined' && Type === 'table') {
            vm.Type = 'table';
            vm.Item = Init;
            return;
        }

        if (Type === 'table-items'){
            vm.Type = 'tableItems';
            vm.Items = Init;
            vm.editItemRoute = 'dynamic-table-item-edit';
            return;
        }

        if (Type === 'edit-item') {
            vm.Type = 'editTableItem';
            vm.Item = Init;
            vm.editItemRoute = 'dynamic-table-item-edit';
            return;
        }

        if (Type === 'add-item') {
            vm.Type = 'editTableItem';
            vm.Item = Init;
            return;
        }
    }
})();
