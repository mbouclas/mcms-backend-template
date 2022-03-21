(function () {
    'use strict';

    angular.module('mcms.notifications')
        .service('UserNotificationService', Service);

    Service.$inject = ['NotificationDataService', '$q', 'lodashFactory'];

    function Service(DS, $q, lo) {
        var _this = this,
            Codes = [],
            FlatCodes = {},
            NotificationTypes = [],
            NotificationTypesFlat = {};
        this.get = get;
        this.getConfig = getConfig;
        this.find = find;
        this.save = save;
        this.destroy = destroy;
        this.setPriorityCodes = setPriorityCodes;
        this.getCodes = getCodes;
        this.setUp = setUp;
        this.notificationTypes = notificationTypes;
        this.newNotification = newNotification;

        function setUp(data){
            setPriorityCodes(data.priorityCodes);
            NotificationTypesFlat = data.notificationTypes;
            processNotificationTypes();
        }

        function getConfig() {
            return DS.getConfig()
                .then(function (data) {
                    setUp(data);
                });
        }

        function notificationTypes(flat) {
            if (typeof flat == 'undefined'){
                return NotificationTypes;
            }

            return NotificationTypesFlat;
        }

        function get(filters) {
            filters = filters || {limit: 10};

            return DS.index(filters);
        }

        function find(id) {
            return DS.show(id)
                .then(function (response) {
                    if (!lo.isObject(response) || typeof response.id == 'undefined'){
                        return newNotification();
                    }

                    return response;
                });
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

        function setPriorityCodes(codes) {
            Codes = codes;
            for (var i in codes){
                FlatCodes[codes[i].key] = codes[i];
            }

        }

        function getCodes(flat) {
            if (typeof flat == 'undefined'){
                return Codes;
            }

            return FlatCodes;
        }

        function processNotificationTypes() {
            for (var key in NotificationTypesFlat){
                NotificationTypes.push(angular.extend(NotificationTypesFlat[key], {key : key}));
            }
        }


        function newNotification() {
            return {
                id : null,
                title : '',
                body : '',
                users : [],
                user_groups : [],
                type : 'normal',
                priority : 'normal'
            };
        }




    }//End constructor


})();
