(function () {
    'use strict';

    angular.module('mcms.tags')
        .service('TagsService', Service);

    Service.$inject = ['lodashFactory'];

    function Service(lo) {
        var Tags = [];

        this.set = set;
        this.get = get;
        this.normalize = normalize;

        function set(tags) {
            Tags = tags;
        }

        function get() {
            return Tags;
        }

        function normalize(tagged) {
            for (var i in tagged){
                if (typeof tagged[i].name == 'undefined' && typeof tagged[i].tag != 'undefined'){
                    tagged[i].name = tagged[i].tag.name;

                }
            }

            return tagged;
        }
    }
})();