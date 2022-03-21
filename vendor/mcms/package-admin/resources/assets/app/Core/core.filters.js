(function () {
    'use strict';
    angular.module('mcms.core')
        .filter('lo', lo)
        .filter('moment', moment)
        .filter('urlEncode', urlEncode)
        .filter('truncate', truncate)
        .filter('unsafe', unsafe)
        .filter('url', url);

    moment.$inject = ['momentFactory'];
    lo.$inject = ['lodashFactory'];
    truncate.$inject = ['lodashFactory'];
    url.$inject = ['$filter','configuration'];
    unsafe.$inject = ['$sce'];

    function moment(Moment) {
        return function (date, format) {
            var defaults = {
                format: "DD/MM/YYYY @ HH:mm"
            };

            return Moment(date).format(format || defaults.format);
        };
    }

    function lo(lo) {
        return function (array,method, params) {
            return lo[method](array, params);
        }
    }

    function url($filter,Config) {
        return function (name, params) {
            return Config.prefixUrl  + $filter('reverseUrl')(name,params);
        }
    }

    function urlEncode() {
        return function (data) {
            if (!data){
                return '';
            }
            if (typeof data === 'object'){
                data = angular.toJson(data);
            }

            return window.encodeURIComponent(data);
        }
    }

    function truncate(lodash) {
        return function (string, length, params) {
            length = length || 40;
            params = params || {
                    'length': length,
                    'separator': ' '
                };
            return lodash.truncate(string, params);
        }
    }
    
    function unsafe($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };

    }
})();
