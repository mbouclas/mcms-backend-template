(function () {
    'use strict';

    angular.module('mcms.dynamicTables', [
    ])
        .run(run);

    run.$inject = [];

    function run(Menu) {

    }

})();

require('./dataService');
require('./service');
require('./dynamicTables.component');
require('./dynamicTableItems.component');
require('./editDynamicTable.component');
require('./editDynamicTableItem.component');
require('./dynamicTablesItemsSelector.component');
require('./DynamicTablesHomeController');
require('./routes');
