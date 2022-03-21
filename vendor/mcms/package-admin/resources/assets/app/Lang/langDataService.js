(function () {
    'use strict';

    angular.module('mcms.lang')
        .service('LangDataService', Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var _this = this;
        var baseUrl = '/admin/api/';
        this.get = get;
        this.init = init;
        this.create = create;
        this.update = update;
        this.delete = deleteItem;
        this.sync = sync;


        function init() {
            return $http.get(baseUrl + 'translations-boot')
                .then(function (result) {
                   return result.data;
                });
        }

        function get(filters) {
            return $http.get(baseUrl + 'translations',{params : filters})
                .then(function (result) {
                    return result.data;
                });
        }

        function create(item) {
            return $http.put(baseUrl + 'translation',{data : item}).then(returnData);
        }

        function update(item) {
            return $http.post(baseUrl + 'translation', {data : item}).then(returnData);
        }

        function deleteItem(item) {
            return $http.delete(baseUrl + 'translation/' + item.key).then(returnData);
        }

        function sync() {
            return $http.post(baseUrl + 'translations/sync', {}).then(returnData);
        }

        function returnData(response) {
            return response.data;
        }
    }
})();
