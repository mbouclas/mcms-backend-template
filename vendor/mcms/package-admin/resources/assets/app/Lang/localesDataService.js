(function () {
    'use strict';

    angular.module('mcms.lang')
        .service('LocaleDataService', Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var _this = this;
        var baseUrl = '/admin/api/locales/';
        this.get = get;
        this.init = init;
        this.create = create;
        this.update = update;
        this.delete = deleteItem;
        this.enable = enable;
        this.disable = disable;
        this.setDefault = setDefault;

        function init() {
            return $http.get(baseUrl + 'init')
                .then(function (result) {
                   return result.data;
                });
        }

        function get(filters) {
            return $http.get(baseUrl + 'get',{params : filters})
                .then(function (result) {
                    return result.data;
                });
        }

        function create(item) {
            return $http.put(baseUrl + 'create',{data : item}).then(returnData);
        }

        function update(item) {
            return $http.post(baseUrl + 'update', {data : item}).then(returnData);
        }

        function deleteItem(items) {
            return $http.post(baseUrl + 'delete', {data : items}).then(returnData);
        }

        function enable(code) {
            return $http.post(baseUrl + 'enable', {code : code}).then(returnData);
        }

        function setDefault(locale) {
            return $http.post(baseUrl + 'setDefault', {code : locale.code}).then(returnData);
        }

        function disable(code) {
            return $http.post(baseUrl + 'disable', {code : code}).then(returnData);
        }

        function returnData(response) {
            return response.data;
        }
    }
})();
