(function () {
    'use strict';

    angular.module('mcms.itemSelector', [
        'ui.tree'
    ])
        .run(run);

    run.$inject = ['ItemSelectorService'];

    function run(ItemSelectorService) {
        if (typeof window.ItemSelector != 'undefined'){
            ItemSelectorService.register(window.ItemSelector.connectors);
        }

    }
})();


require('./itemSelector.component');
require('./itemConnectorFilter.component');
require('./itemConnector.component');
require('./service');