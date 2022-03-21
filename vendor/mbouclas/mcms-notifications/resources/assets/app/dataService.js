(function () {
    'use strict';

    angular.module('mcms.notifications')
        .service('NotificationDataService',Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var _this = this;
        var baseUrl = '/admin/api/notifications/';

        this.index = index;
        this.getConfig = getConfig;
        this.store = store;
        this.show = show;
        this.update = update;
        this.destroy = destroy;

        function index(filters) {
            return $http.get(baseUrl, {params : filters}).then(returnData);
        }

        function getConfig() {
            return $http.get(baseUrl + 'config').then(returnData);
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


        function returnData(response) {
            return response.data;
        }
    }
})();
