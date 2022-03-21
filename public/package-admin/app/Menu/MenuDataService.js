(function () {
    'use strict';

    angular.module('mcms.menu')
        .service('MenuDataService',Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var _this = this;
        var baseUrl = '/admin/api/menu/',
            menuItemBase = '/admin/api/menuItem/';

        this.index = index;
        this.store = store;
        this.show = show;
        this.update = update;
        this.destroy = destroy;
        this.filter = filter;
        this.storeNode = storeNode;
        this.destroyNode = destroyNode;
        this.updateNode = updateNode;
        this.rebuild = rebuild;

        function index() {
            return $http.get(baseUrl).then(returnData);
        }

        function store(menu) {
            return $http.post(baseUrl, menu)
                .then(returnData);
        }

        function show(id) {
            return $http.get(baseUrl + id).then(returnData);
        }

        function update(menu) {
            return $http.put(baseUrl + menu.id, menu)
                .then(returnData);
        }

        function destroy(id) {
            return $http.delete(baseUrl + id)
                .then(returnData);
        }

        function storeNode(node) {
            return $http.post(menuItemBase, node)
                .then(returnData);
        }

        function filter(query) {
            return $http.get(menuItemBase + 'filter', {params : query}).then(returnData);
        }
        
        function destroyNode(id) {
            return $http.delete(menuItemBase + id)
                .then(returnData);
        }
        
        function updateNode(node) {
            return $http.put(menuItemBase + node.id, node)
                .then(returnData);
        }

        function rebuild(menu) {
            return $http.put(menuItemBase + 'rebuild', menu)
                .then(returnData);
        }

        function returnData(response) {
            return response.data;
        }
    }
})();
