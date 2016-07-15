(function () {
    'use strict';

    angular.module('mcms.pages.pageCategory')
        .service('PageCategoryService',Service);

    Service.$inject = ['PageCategoryDataService', 'ItemSelectorService'];
    /**
     * The PageCategory service
     *
     * @param {object} DS
     * @param ItemSelector
     * @constructor
     */
    function Service(DS, ItemSelector) {
        var _this = this;
        var Categories = [];
        this.get = get;
        this.find = find;
        this.newCategory = newCategory;
        this.save = save;
        this.destroy = destroy;
        this.rebuild = rebuild;
        this.tree = tree;
        this.categories = categories;

        function get() {
            return DS.index()
                .then(function (response) {
                    Categories = response;
                    return response;
                });
        }

        function find(id) {
            return DS.show(id)
                .then(function (response) {
                    ItemSelector.register(response.connectors);
                    return response.item;
                });
        }

        function tree(filters) {
            return DS.tree(filters)
                .then(function (response) {
                    return response;
                });
        }


        /**
         * Create the holder object for a new category object
         *
         * @returns {{title: string, description: string, slug: string, children: Array, settings: {}, active: boolean, orderBy: number}}
         */
        function newCategory() {
            return {
                title : '',
                description : '',
                slug : '',
                children : [],
                settings : {},
                active : false,
                orderBy : 0,
            };
        }

        function save(item) {
            if (!item.id){
                return DS.store(item);
            }


            return DS.update(item);
        }

        function destroy(item) {
            return DS.destroy(item.id);
        }

        function rebuild(tree) {
            return DS.rebuild(tree)
                .then(function (newTree) {
                    Categories = newTree;
                });
        }

        function categories() {
            return Categories;
        }

    }
})();
