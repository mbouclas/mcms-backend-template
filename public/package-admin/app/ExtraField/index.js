(function () {
    'use strict';

    angular.module('mcms.extraFields', [
    ])
        .run(run);

    run.$inject = [];

    function run(Menu) {

    }

})();

require('./dataService')
require('./service')
require('./extraFieldsEditor.component')
