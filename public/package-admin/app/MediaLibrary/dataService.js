(function () {
    'use strict';

    angular.module('mcms.mediaLibrary')
        .service('MediaLibraryDataService',Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var _this = this;
        var baseUrl = '/admin/api/mediaLibrary/';

        this.index = index;
        this.store = store;
        this.show = show;
        this.update = update;
        this.destroy = destroy;
        this.tags = tags;
        this.assign = assign;

        function index(filters) {
            return $http.get(baseUrl, {params : filters}).then(returnData);
        }

        function store(item) {
            return $http.post(baseUrl, item)
                .then(returnData);
        }

        function show(id) {
            return $http.get(baseUrl + id)
                .then(returnData);
        }

        function update(item) {
            return $http.put(baseUrl + item.id, item)
                .then(returnData);
        }

        function destroy(id) {
            return $http.delete(baseUrl + id)
                .then(returnData);
        }

        function tags(filters) {
            return $http.get(baseUrl + 'tags', {params : filters}).then(returnData);
        }

        function assign(to, item) {
            return $http.post(baseUrl + 'assign', {to : to, item : item})
                .then(returnData);
        }

        function returnData(response) {
            return response.data;
        }
    }
})();
