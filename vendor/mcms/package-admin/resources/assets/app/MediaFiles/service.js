(function () {
    'use strict';

    angular.module('mcms.mediaFiles')
        .service('mediaFileService', Service);

    Service.$inject = ['ImageDataService'];

    function Service(ImageDS) {
        var ImageCategories = [];

        this.setImageCategories = setImageCategories;
        this.getImageCategories = getImageCategories;
        this.saveImage = saveImage;
        this.deleteImage = deleteImage;
        this.sortImages = sortImages;

        function setImageCategories(categories) {
            ImageCategories = categories;
        }

        function getImageCategories() {
            return ImageCategories;
        }

        function saveImage(image) {
            return ImageDS.update(image);
        }

        function deleteImage(id) {
            return ImageDS.destroy(id);
        }

        function sortImages(images) {
            return ImageDS.sort(images);
        }
    }
})();