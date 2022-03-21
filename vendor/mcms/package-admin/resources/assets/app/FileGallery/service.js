(function () {
    'use strict';

    angular.module('mcms.fileGallery')
        .service('FileGalleryService', Service);

    Service.$inject = ['FilesDataService'];

    function Service(DS) {
        var ImageCategories = [];

        this.save = save;
        this.destroy = destroy;
        this.sort = sort;

        function save(file) {
            return DS.update(file);
        }

        function destroy(id) {
            return DS.destroy(id);
        }

        function sort(files) {
            return DS.sort(files);
        }
    }
})();
