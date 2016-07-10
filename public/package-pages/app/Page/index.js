(function(){
    'use strict';

    angular.module('mcms.pages.page', [])
        .run(run);

    run.$inject = ['mcms.menuService'];

    function run(Menu) {

    }
})();

require('./routes');
require('./dataService');
require('./service');
require('./PageHomeController');
require('./PageController');
require('./editPage.component');
