(function () {
    'use strict';

    angular.module('mcms.mediaFiles', [
        'angular-sortable-view'
    ])
        .run(run);

    run.$inject = [];

    function run(Menu) {

    }

})();

require('./imageDataService');
require('./mediaFiles.component');
require('./editImage.component');
require('./service');