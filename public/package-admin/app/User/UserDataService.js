(function () {
    'use strict';

    angular.module('mcms.user')
        .service('UserDataService',Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var _this = this;
        var baseUrl = '/admin/api/user/';

        this.index = index;
        this.store = store;
        this.show = show;
        this.update = update;
        this.destroy = destroy;

        function index() {
            return $http.get(baseUrl).then(returnData);
        }

        function store(user) {
            return $http.post(baseUrl, user)
                .then(returnData);
        }

        function show(id) {

        }

        function update(user) {
            return $http.put(baseUrl + user.id, user)
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
