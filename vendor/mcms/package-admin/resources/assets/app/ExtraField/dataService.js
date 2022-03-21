(function () {
    'use strict';

    angular.module('mcms.extraFields')
        .service('ExtraFieldsDataService',Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var _this = this;
        var baseUrl = '/admin/api/extraField/';

        this.index = index;
        this.update = update;
        this.index = index;
        this.store = store;
        this.show = show;
        this.update = update;
        this.destroy = destroy;

        function index(filters) {
            return $http.get(baseUrl, {params : filters}).then(returnData);
        }

        function store(item) {
            return $http.post(baseUrl, item)
                .then(returnData);
        }

        function show(id) {
            return $http.get(baseUrl + id).then(returnData);
        }

        function update(item, id) {
            return $http.put(baseUrl + id, item)
                .then(returnData);
        }

        function destroy(id) {
            return $http.delete(baseUrl + id)
                .then(returnData);
        }

        function returnData(response) {
            return response.data;
        }
    }
})();
