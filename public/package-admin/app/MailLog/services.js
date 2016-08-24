(function () {
    'use strict';

    angular.module('mcms.mailLog')
        .service('MailLogService', Service);

    Service.$inject = ['MailLogDataService'];

    function Service(DS) {
        var _this = this;
        var Log = [];
        this.get = get;
        this.find = find;
        this.save = save;
        this.destroy = destroy;

        function get(filters) {
            filters = filters || {limit: 10};

            return DS.index(filters)
                .then(function (response) {
                    Log = response;
                    return response;
                });
        }

        function find(id) {
            return DS.show(id);
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

    }//End constructor


})();
