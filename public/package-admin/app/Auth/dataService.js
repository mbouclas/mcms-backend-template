(function () {
    'use strict';

    angular.module('mcms.auth')
        .service('auth.dataService',Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var _this = this;
        var baseUrl = '/admin/api/';
        this.login = login;
        this.logout = logout;
        this.saveRole = saveRole;
        this.savePermission = savePermission;
        this.destroyPermission = destroyPermission;
        this.destroyRole = destroyRole;



        function login(loginData) {
            return $http.post('/admin/login', loginData);
        }

        function logout() {
            return $http.post('/admin/logout')
                .then(returnSuccess);
        }

        function saveRole(role) {
            var method = (role.id) ? 'put' : 'post';
            var endPoint = (role.id) ? 'role/' + role.id : 'role';

            return $http[method](baseUrl + endPoint, role)
                .then(returnSuccess);
        }

        function savePermission(permission) {
            var method = (permission.id) ? 'put' : 'post';
            var endPoint = (permission.id) ? 'permission/' + permission.id : 'permission';

            return $http[method](baseUrl + endPoint, permission)
                .then(returnSuccess);
        }

        function destroyRole(id) {
            return $http.delete(baseUrl + 'role/' + id)
                .then(returnSuccess);
        }

        function destroyPermission(id) {
            return $http.delete(baseUrl + 'permission/' + id)
                .then(returnSuccess);
        }


        function returnSuccess(result) {
            return result.data;
        }
    }
})();
