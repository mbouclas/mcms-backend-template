(function () {
    'use strict';

    angular.module('mcms.itemSelector')
        .service('ItemSelectorService',Service);

    Service.$inject = ['core.services', 'lodashFactory', '$http'];

    function Service(Helpers, lo, $http) {
        var _this = this;
        var Connectors = [];
        var baseUrl = '/admin/api/itemSelector/filter'
        this.register = register;
        this.connectors = connectors;
        this.filter = filter;

        function register(connector) {
            if (lo.isArray(connector)){
                Connectors = connector;
                return this;

            }

            if (Connectors.indexOf(connector) != -1){
                return this;
            }

            Connectors.push(connector);
            return this;
        }

        function connectors() {
            return Connectors;
        }

        function filter(query, connector, section) {
            return $http.post(baseUrl, angular.extend({
                connector : connector,
                section : section
            },query))
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();
