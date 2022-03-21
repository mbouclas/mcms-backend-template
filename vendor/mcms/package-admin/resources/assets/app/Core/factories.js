(function () {
    'use strict';

    angular.module('mcms.core')
        .factory('lodashFactory', lodashFactory)
        .factory('sprintfFactory', sprintfFactory)
        .factory('slugFactory', slugFactory)
        .factory('momentFactory', momentFactory);

    function lodashFactory() {
        return require('lodash');
    }

    function sprintfFactory() {
        var SprintF = require('sprintf');
        return SprintF.sprintf;
    }

    function momentFactory() {
        return require('moment');
    }

    function slugFactory() {
        return require('slug');
    }

})();
