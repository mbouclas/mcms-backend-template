(function () {
    'use strict';

    angular.module('mcms.user')
        .service('UserService', Service);

    Service.$inject = ['UserDataService', 'AuthService', 'lodashFactory', 'ExtraFieldService', 'configuration', '$q'];

    function Service(DS, ACL, lo, ExtraFieldService, Config, $q) {
        var _this = this;
        var Users = [],
            ProfileSettings = {},
            ExtraFields = [];

        this.User = {};
        this.get = get;
        this.find = find;
        this.newUser = newUser;
        this.save = save;
        this.destroy = destroy;
        this.profileSettings = profileSettings;
        this.prefill = prefill;
        this.allExtraFields = allExtraFields;
        this.extraFields = extraFields;
        this.resetPassword = resetPassword;
        this.sendPasswordResetLink = sendPasswordResetLink;
        this.validateField = validateField;

        function get(filters) {
            return DS.index(filters)
                .then(function (response) {
                    Users = response.data;
                    ProfileSettings = response.profileSettings;
                    ExtraFields = ExtraFieldService.convertFieldsFromMysql(response.extraFields);
                    for (var i in Users) {
                        Users[i].fullName = Users[i].firstName + ' ' + Users[i].lastName;
                    }

                    return response;
                });
        }

        function find(id) {
            return DS.show(id)
                .then(function (response) {
                    var user = (!response.user) ? newUser() : response.user;
                    ProfileSettings = response.profileSettings;
                    ExtraFields = ExtraFieldService.convertFieldsFromMysql(response.extraFields);
                    user.fullName = user.firstName + ' ' + user.lastName;
                    return user;
                });
        }

        function newUser() {
            return {
                email: '',
                firstName: '',
                lastName: '',
                user_permissions: [],
                roles: [],
                settings: {},
                profile: {}
            };
        }

        function save(user) {
            if (!user.id) {
                return DS.store(user);
            }


            return DS.update(user);
        }

        function destroy(user) {
            return DS.destroy(user.id);
        }

        function profileSettings() {
            return ProfileSettings;
        }

        function prefill(user, items) {
            //we need to check on what we have to prefill.
            //Accepted keys : roles, user_permissions, any user key
            var acceptedKeys = {
                roles: presetRole,
                user_permissions: presetPermission
            };

            //first step to check the non standard keys
            lo.forEach(items, function (value, key) {
                if (typeof acceptedKeys[key] == 'undefined') {// set it as standard key
                    user[key] = value;
                    return;
                }

                user[key] = acceptedKeys[key](value);
            });

            return user;
        }

        function presetRole(role, first) {
            var roles = [];
            if (lo.isArray(role)) {
                for (var i in role) {
                    roles.push(presetRole(role[i], true));
                }

                return roles;
            }
            //find the role
            var allRoles = ACL.roles();

            var found = lo.find(allRoles, {name: role});
            if (!found) {
                return roles;
            }

            roles.push(found);
            return (first) ? roles[0] : roles;
        }

        function presetPermission(permission, first) {
            var permissions = [];
            if (lo.isArray(permission)) {
                for (var i in permission) {
                    permissions.push(presetPermission(permission[i], true));
                }

                return permissions;
            }
            //find the permission
            var allPermissions = ACL.permissions();

            var found = lo.find(allPermissions, {name: permission});
            if (!found) {
                return permissions;
            }

            permissions.push(found);

            return (first) ? permissions[0] : permissions;
        }

        function allExtraFields() {
            if (ExtraFields.length > 0) {
                return $q.resolve(ExtraFields);
            }

            return ExtraFieldService.get({model: Config.userModel})
                .then(function (response) {
                    ExtraFields = ExtraFieldService.convertFieldsFromMysql(response);
                    return ExtraFields;
                });
        }

        function extraFields() {
            return ExtraFields;
        }

        function resetPassword(form) {
            return DS.resetPassword(form);
        }

        function sendPasswordResetLink(email) {
            return DS.sendPasswordResetLink(email);
        }

        function validateField(field, value) {
            return DS.validateField(field, value);
        }
    }
})();
