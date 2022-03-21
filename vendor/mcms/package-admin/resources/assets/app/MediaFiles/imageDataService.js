(function () {
    'use strict';

    angular.module('mcms.mediaFiles')
        .service('ImageDataService',Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var _this = this;
        var baseUrl = '/admin/api/image/';

        this.index = index;
        this.store = store;
        this.show = show;
        this.update = update;
        this.destroy = destroy;
        this.sort = sort;


        function index() {
            return $http.get(baseUrl).then(returnData);
        }

        function store(image) {
            return $http.post(baseUrl, image)
                .then(returnData);
        }

        function show(id) {
            return $http.get(baseUrl + id).then(returnData);
        }

        function update(image) {
            return $http.put(baseUrl + image.id, image)
                .then(returnData);
        }

        function destroy(id) {
            return $http.delete(baseUrl + id)
                .then(returnData);
        }

        function returnData(response) {
            return response.data;
        }

        function sort(images) {
            return $http.post(baseUrl + 'sort', images)
                .then(returnData);
        }
    }
})();
