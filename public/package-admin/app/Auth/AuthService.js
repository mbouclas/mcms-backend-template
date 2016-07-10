(function () {
    'use strict';

    angular.module('mcms.auth')
        .service('AuthService',Service);

    Service.$inject = ['lodashFactory', 'auth.dataService'];

    function Service(lo, DS) {
        var _this = this,
            User = {},
            Roles = [],
            Permissions = [];

        this.intended = '';
        this.assignUser = assignUser;
        this.attachRoles = attachRoles;
        this.attachPermissions = attachPermissions;
        this.can = can;
        this.level = level;
        this.role = role;
        this.roles = roles;
        this.permissions = permissions;
        this.getUser = getUser;
        this.isLoggedIn = isLoggedIn;
        this.login = login;
        this.logout = logout;
        this.newRole = newRole;
        this.newPermission = newPermission;
        this.saveRole = saveRole;
        this.savePermission = savePermission;
        this.destroyPermission = destroyPermission;
        this.destroyRole = destroyRole;
        this.togglePermission = togglePermission;
        this.toggleRole = toggleRole;
        this.checkForPermission = checkForPermission;
        this.checkForRole = checkForRole;

        /**
         * Add a user to the auth class
         *
         * @param user
         */
        function assignUser(user) {
            User = user;
        }

        /**
         * Attach the available roles to the service
         *
         * @param roles
         */
        function attachRoles(roles) {
            Roles = roles;
        }

        /**
         * Attach available permissions to the service
         *
         * @param permissions
         */
        function attachPermissions(permissions) {
            Permissions = permissions;
        }

        /**
         * Check if the user has the required permissions
         *
         * @param permission
         */
        function can(permission) {
            if (!lo.isArray(User.permissions)){
                return false;
            }

            return lo.find(User.permissions,{slug : permission});
        }

        /**
         * Check if the user is at the required level or above
         *
         * @param level
         */
        function level(level) {
            if (!lo.isArray(User.roles)){
                return false;
            }

            return lo.find(User.roles,function(o) { return o.level >= level; });
        }

        /**
         * Check if user is part of a group
         *
         * @param role
         */
        function role(role) {
            if (!lo.isArray(User.roles)){
                return false;
            }

            if (role.indexOf('|') != -1){
                var roles = role.split('|');
                for (var i in roles){
                    if (hasRole(roles[i])){
                        return true;
                    }
                }

                return false;
            }

            return hasRole(role);

        }

        /**
         * Check if the user has this role
         *
         * @param role
         */
        function hasRole(role) {
            //first find the role in the roles array. If there isn't one, something's wrong
            var baseRole = lo.find(Roles,{slug : role});
            if (!baseRole){
                return false;
            }

            //now check if the user has this role directly or if he is of higher level
            return lo.find(User.roles,function(o) {
                //check for exact match
                if (o.slug == role){
                    return true;
                }

                //check for inherited role from lower level. SU inherits from admin
                //so if i am in SU group, and admin is required, i should be fine
                if (typeof baseRole.level != 'undefined' && lo.isInteger(baseRole.level)){
                    //find my role in Roles
                    var userRole = lo.find(Roles,{slug : o.slug});
                    return (userRole.level >= baseRole.level);
                }

                return false;
            });
        }

        /**
         * Get the current user
         *
         * @returns {{}}
         */
        function getUser() {
            return User;
        }

        /**
         * If the user object is not set yet, then we are invalid thus not properly logged in
         *
         * @returns boolean
         */
        function isLoggedIn() {
            return !(typeof User.id == 'undefined');
        }

        /**
         * Responsible for logging in a user
         *
         * @param credentials
         * @returns Promise
         */
        function login(credentials) {
            return DS.login(credentials)
                .then(function (result) {
                    _this.assignUser(result.data.user);
                    return result.data;
                })
        }

        /**
         * Responsible for logging out a user
         *
         * @returns Promise
         */
        function logout() {
            return DS.logout()
                .then(function () {
                   User = {};
                });
        }

        function roles() {
            return Roles;
        }

        function permissions() {
            return Permissions;
        }

        function newRole() {
            return {
                name : '',
                slug : '',
                description : '',
                level : 1
            };
        }

        function newPermission() {
            return {
                name : '',
                slug : '',
                description : '',
                model : ''
            };
        }

        function saveRole(role) {
            return DS.saveRole(role)
                .then(function (newRole) {
                   //add it to existing ones
                    if (!role.id && newRole.id){
                        Roles.push(newRole);
                        role = newRole;
                    }

                    return newRole;
                });
        }

        function savePermission(permission) {
            return DS.savePermission(permission)
                .then(function (newPermission) {
                    //add it to existing ones
                    if (!permission.id && newPermission.id){
                        Permissions.push(newPermission);
                        permission = newPermission;
                    }

                    return newPermission;
                });
        }
        
        function destroyRole(role) {
            return DS.destroyRole(role.id)
                .then(function () {
                    var index = lo.findIndex(Roles, {id : role.id});
                    Roles.splice(index, 1);
                });
        }
        
        function destroyPermission(permission) {
            return DS.destroyPermission(permission.id)
                .then(function () {
                    var index = lo.findIndex(Permissions, {id : permission.id});
                    Permissions.splice(index, 1);
                });
        }

        function togglePermission(user, permission) {
            var idx = lo.findIndex(user.user_permissions, {slug : permission.slug});
            if (idx > -1) {
                user.user_permissions.splice(idx, 1);
            }
            else {
                user.user_permissions.push(permission);
            }
        }

        function toggleRole(user, role) {
            var idx = lo.findIndex(user.roles, {slug : role.slug});
            if (idx > -1) {
                user.roles.splice(idx, 1);
            }
            else {
                user.roles.push(role);
            }
        }
        
        function checkForPermission(user, permission) {
            return lo.find(user.user_permissions, {slug : permission.slug});
        }

        function checkForRole(user, role) {
            return lo.find(user.roles, {slug : role.slug});
        }
    }
})();
