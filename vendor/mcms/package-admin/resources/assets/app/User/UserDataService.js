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
        this.saveWidgetPositions = saveWidgetPositions;
        this.sendPasswordResetLink = sendPasswordResetLink;
        this.resetPassword = resetPassword;
        this.validateField = validateField;

        function index(filters) {
            return $http.get(baseUrl, {params : filters}).then(returnData);
        }

        function store(user) {
            return $http.post(baseUrl, user)
                .then(returnData);
        }

        function show(id) {
            return $http.get(baseUrl + id).then(returnData);
        }

        function update(user) {
            return $http.put(baseUrl + user.id, user)
                .then(returnData);
        }

        function destroy(id) {
            return $http.delete(baseUrl + id)
                .then(returnData);
        }

        function saveWidgetPositions(widgets) {
            return $http.put(baseUrl + 'widgetPositions', widgets)
                .then(returnData);
        }

        function sendPasswordResetLink(email) {
            return $http.post(baseUrl + 'sendPasswordResetLink', {email : email})
                .then(returnData);
        }

        function resetPassword(form) {
            return $http.post(baseUrl + 'resetPassword', form)
                .then(returnData);
        }

        function validateField(field, value) {
            return $http.post(baseUrl + 'validateField', {field : field, value : value})
                .then(returnData);
        }


        function returnData(response) {
            return response.data;
        }
    }
})();
