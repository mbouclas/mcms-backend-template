(function () {
    'use strict';

    angular.module('mcms.fileGallery', [
        'angular-sortable-view'
    ])
        .run(run);

    run.$inject = [];

    function run(Menu) {

    }

})();

require('./dataService');
require('./fileGallery.component');
require('./editFile.component');
require('./service');