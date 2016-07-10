(function () {
    'use strict';

    angular.module('mcms.user')
        .service('UserService',Service);

    Service.$inject = ['UserDataService'];

    function Service(DS) {
        var _this = this;
        var Users = [];
        this.get = get;
        this.newUser = newUser;
        this.save = save;
        this.destroy = destroy;

        function get() {
            return DS.index()
                .then(function (response) {
                    Users = response.data;
                    return response;
                });
        }

        function newUser() {
            return {
                email : '',
                firstName : '',
                lastName : '',
                user_permissions : [],
                roles : [],
                settings : {},
                profile : {}
            };
        }
        
        function save(user) {
            if (!user.id){
                return DS.store(user);
            }


            return DS.update(user);
        }
        
        function destroy(user) {
            return DS.destroy(user.id);
        }

    }
})();
