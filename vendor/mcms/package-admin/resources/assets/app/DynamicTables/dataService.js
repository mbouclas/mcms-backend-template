(function () {
    'use strict';

    angular.module('mcms.dynamicTables')
        .service('DynamicTablesDataService',Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var _this = this;
        var baseUrl = '/admin/api/dynamicTable/';

        this.index = index;
        this.update = update;
        this.getTables = getTables;
        this.getTableItems = getTableItems;
        this.index = index;
        this.store = store;
        this.show = show;
        this.update = update;
        this.destroy = destroy;
        this.rebuild = rebuild;

        function getTables(model) {
            return $http.get(baseUrl, {params : {model : model}}).then(returnData);
        }

        function index(filters) {
            return $http.get(baseUrl, {params : filters}).then(returnData);
        }

        function getTableItems(id) {
            return $http.get(baseUrl + 'getTableItems/' + id).then(returnData);
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

        function destroy(item) {
            return $http.delete(baseUrl + item.id, {params : {model : item.model}})
                .then(returnData);
        }

        function rebuild(parentId, tree) {
            return $http.put(baseUrl + 'rebuild/' + parentId, tree)
                .then(returnData);
        }

        function returnData(response) {
            return response.data;
        }
    }
})();
