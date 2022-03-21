(function () {
    'use strict';

    angular.module('mcms.mediaLibrary')
        .service('MediaLibraryService', Service);

    Service.$inject = ['MediaLibraryDataService', '$q', 'TagsService'];

    function Service(DS, $q, Tag) {
        var _this = this;
        var Log = [];
        this.get = get;
        this.find = find;
        this.save = save;
        this.destroy = destroy;
        this.tags = tags;
        this.assign = assign;

        function get(filters) {
            filters = filters || {collection_name : 'images',limit: 20};
            return DS.index(filters)
                .then(function (response) {
                    Log = response;
                    return response;
                });
        }

        function find(id) {
            return $q.all([
                DS.show(id),
                tags()
            ])
                .then(function (results) {
                    Tag.set(results[1]);
                    return results[0];
                });
        }

        function save(item) {
            if (!item.id) {
                return DS.store(item);
            }


            return DS.update(item);
        }

        function destroy(item) {
            return DS.destroy(item.id);
        }

        function tags() {
            return DS.tags();
        }

        function assign(to, item) {
            return DS.assign(to, item);
        }

    }//End constructor


})();
