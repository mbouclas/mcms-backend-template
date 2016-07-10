(function () {
    'use strict';

    angular.module('mcms.pages.page')
        .service('PageService',Service);

    Service.$inject = ['PageDataService', 'LangService', 'lodashFactory', 'mediaFileService', '$q', 'PageCategoryService'];

    function Service(DS, Lang, lo, MediaFiles, $q, PageCategoryService) {
        var _this = this;
        var Pages = [];
        this.get = get;
        this.init = init;
        this.find = find;
        this.newPage = newPage;
        this.save = save;
        this.destroy = destroy;

        function init() {
            var tasks = [
                get(),
                categories()
            ];

            return $q.all(tasks);
        }

        function get(filters) {
            return DS.index(filters)
                .then(function (response) {
                    Pages = response;
                    return Pages;
                });
        }

        function categories() {
            return PageCategoryService.tree();
        }

        function find(id) {
            return DS.show(id)
                .then(function (response) {
                    MediaFiles.setImageCategories(response.imageCategories);
                    return response.item || newPage();
                });
        }

        function newPage() {
            return {
                title : Lang.langFields(),
                slug : '',
                description : Lang.langFields(),
                description_long : Lang.langFields(),
                active : false,
                categories : [],
                extraFields : [],
                related : [],
                settings : {},
                id : null
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



    }
})();
