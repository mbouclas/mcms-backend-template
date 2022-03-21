(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
    'use strict';

    angular.module('mcms.notifications')
        .controller('NotificationsEditController',Controller);

    Controller.$inject = ['item', 'UserNotificationService', 'core.services'];

    function Controller(Item, UserNotificationService, Helpers) {
        var vm = this;
        vm.Item = Item;

        vm.onSave = function (item, isNew) {
            if (isNew){
                return Helpers.redirectTo('notification-edit', {id : item.id});
            }
        };

    }


})();

},{}],2:[function(require,module,exports){
(function() {
    'use strict';

    angular.module('mcms.notifications')
        .controller('NotificationsHomeController',Controller);

    Controller.$inject = ['items', 'UserNotificationService', 'BottomSheet', '$mdSidenav',
        'Dialog', 'core.services', '$rootScope', 'lodashFactory'];

    function Controller(Items, UserNotificationService, BottomSheet, $mdSidenav, Dialog, Helpers, $rootScope, lo) {
        var vm = this;
        vm.priorityCodes = UserNotificationService.getCodes();
        vm.priorityCodesFlat = UserNotificationService.getCodes(true);
        vm.notificationTypes = UserNotificationService.notificationTypes();
        vm.notificationTypesFlat = UserNotificationService.notificationTypes(true);

        function filter() {
            vm.Loading = true;
            vm.Items = [];
            return UserNotificationService.get(vm.filters)
                .then(function (res) {
                    vm.Loading = false;
                    setUp(res);
                    $rootScope.$broadcast('scroll.to.top');
                });
        }

        vm.listItemClick = function($index) {
            $mdBottomSheet.hide(clickedItem);
        };

        vm.toggleFilters = function () {
            $mdSidenav('filters').toggle();
        };

        vm.edit = function (item) {
            Dialog.show({
                title: (typeof item == 'undefined') ? 'Create Notification' : 'Edit "' + item.title + '"',
                contents: '<edit-user-notification ng-model="VM.model" on-save="VM.onSave(item, isNew)"></edit-user-notification>',
                locals: {
                    model: item || {},
                    onSave: vm.onSave
                }
            });
        };

        vm.editRedirect = function (item) {
            return Helpers.redirectTo('notification-edit', {id : item.id});
        };

        vm.changePage = function (page, limit) {
            vm.filters.page = page;
            filter();
        };

        vm.applyFilters = function () {
            filter();
        };

        vm.delete = function (item) {
            Helpers.confirmDialog({}, {})
                .then(function () {
                    UserNotificationService.destroy(item)
                        .then(function () {
                            filter();
                            Helpers.toast('Saved!');
                        });
                });
        };

        vm.showActions = function (ev, item) {

            BottomSheet.show({
                item : item,
                title : 'Edit ' + item.title
            },[
                { name: 'Edit', icon: 'edit', fn : vm.editRedirect },
                { name: 'Quick Edit', icon: 'edit', fn : vm.edit },
                { name: 'Delete', icon: 'delete', fn : vm.delete },
            ]);
        };

        vm.onSave = function (item, isNew) {
            if (isNew){
                filter();
                Dialog.close();
                return;
            }

            var $index = lo.findIndex(vm.Items, {id : item.id});
            vm.Items[$index] = item;

        };

        setUp(Items);

        function setUp(res) {
            vm.Pagination = res;
            vm.Items = res.data;
        }
    }


})();

},{}],3:[function(require,module,exports){
(function(){
    'use strict';
    var assetsUrl = '/assets/',
        appUrl = '/app/',
        componentsUrl = appUrl + 'Components/',
        templatesDir = '/vendor/mcms/notifications/app/templates/';

    var config = {
        apiUrl : '/api/',
        prefixUrl : '/admin',
        templatesDir : templatesDir,
        imageUploadUrl: '/admin/api/upload/image',
        fileUploadUrl: '/admin/api/upload/file',
        imageBasePath: assetsUrl + 'img',
        validationMessages : templatesDir + 'Components/validationMessages.html',
        appUrl : appUrl,
        componentsUrl : componentsUrl,
        fileTypes : {
            image : {
                accept : 'image/*',
                acceptSelect : 'image/jpg,image/JPG,image/jpeg,image/JPEG,image/PNG,image/png,image/gif,image/GIF'
            },
            document : {
                accept : 'application/pdf,application/doc,application/docx',
                acceptedFiles : '.pdf,.doc,.docx',
                acceptSelect : 'application/pdf,application/doc,application/docx'
            },
            file : {
                accept : 'application/*',
                acceptSelect : 'application/*,.pdf,.doc,.docx'
            },
            audio : {
                accept : 'audio/*',
                acceptSelect : 'audio/*'
            }
        }
    };

    angular.module('mcms.core')
        .constant('NOTIFICATIONS_CONFIG',config);
})();

},{}],4:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('mcms.notifications')
        .service('NotificationDataService',Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var _this = this;
        var baseUrl = '/admin/api/notifications/';

        this.index = index;
        this.getConfig = getConfig;
        this.store = store;
        this.show = show;
        this.update = update;
        this.destroy = destroy;

        function index(filters) {
            return $http.get(baseUrl, {params : filters}).then(returnData);
        }

        function getConfig() {
            return $http.get(baseUrl + 'config').then(returnData);
        }

        function store(item) {
            return $http.post(baseUrl, item)
                .then(returnData);
        }

        function show(id) {
            return $http.get(baseUrl + id)
                .then(returnData);
        }

        function update(item) {
            return $http.put(baseUrl + item.id, item)
                .then(returnData);
        }

        function destroy(id) {
            return $http.delete(baseUrl + id)
                .then(returnData);
        }


        function returnData(response) {
            return response.data;
        }
    }
})();

},{}],5:[function(require,module,exports){
(function () {
    angular.module('mcms.notifications')
        .directive('editUserNotification', Directive);

    Directive.$inject = ['NOTIFICATIONS_CONFIG', '$timeout'];
    Controller.$inject = ['$scope', 'UserNotificationService', 'configuration', 'core.services'];

    function Directive(Config, $timeout) {

        return {
            templateUrl: Config.templatesDir + "Notifications/editUserNotification.component.html",
            controller: Controller,
            controllerAs: 'VM',
            require: ['editUserNotification', 'ngModel'],
            scope: {
                options: '=?options',
                ngModel: '=ngModel',
                onSave: '&?onSave'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {};

                var watcher = scope.$watch('ngModel', function (val) {
                    if (!val) {
                        return;
                    }
                    controllers[0].setUp(scope.ngModel);
                    watcher();
                });

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
            }
        };
    }

    function Controller($scope, UserNotificationService, Config, Helpers) {

        var vm = this;
        vm.Item = [];
        vm.ValidationMessagesTemplate = Config.validationMessages;
        vm.priorityCodes = UserNotificationService.getCodes();
        vm.priorityCodesFlat = UserNotificationService.getCodes(true);
        vm.notificationTypes = UserNotificationService.notificationTypes();
        vm.notificationTypesFlat = UserNotificationService.notificationTypes(true);


        this.setUp = function (item) {
            vm.Item = item;

            if (typeof item.id == 'undefined') {
                vm.Item = UserNotificationService.newNotification();
            }
        };


        vm.save = function () {

            if (vm.Item.type != 'normal' && !vm.Item.id) {
                var userCount = (vm.Item.users.length == 0) ? 'all your users' : vm.Item.users.length + ' users';
                Helpers.confirmDialog({}, {
                    title: 'This will queue up an ' + vm.Item.type + ' notification to ' + userCount
                })
                    .then(function () {
                        save();
                    });

                return;
            }

            save();
        };

        function save() {
            UserNotificationService.save(vm.Item)
                .then(function (result) {

                    if (typeof $scope.onSave == 'function') {
                        $scope.onSave({item: result, isNew: !vm.Item.id});
                    }

                    Helpers.toast('saved!!!');
                })
        }

        vm.removeUser = function (item) {
            vm.Item.users.splice(vm.Item.users.indexOf(vm.Item.users, {id: item.id}), 1);
        };

    }
})();
},{}],6:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('mcms.notifications', [])
        .run(run);

    run.$inject = ['mcms.menuService', 'UserNotificationService'];


    function run(Menu, UserNotificationService) {
        UserNotificationService.getConfig();
        Menu.addMenu(Menu.newItem({
            id: 'notifications',
            title: 'Notifications',
            permalink: '/notifications',
            icon: 'notifications',
            order: 2,
            acl: {
                type: 'level',
                permission: 2
            }
        }));
    }
})();

require('./config');
require('./routes');
require('./dataService');
require('./services');
require('./NotificationsHomeController');
require('./NotificationsEditController');
require('./editUserNotification.component.js');

},{"./NotificationsEditController":1,"./NotificationsHomeController":2,"./config":3,"./dataService":4,"./editUserNotification.component.js":5,"./routes":7,"./services":8}],7:[function(require,module,exports){
(function() {
    'use strict';

    angular.module('mcms.notifications')
        .config(config);

    config.$inject = ['$routeProvider','NOTIFICATIONS_CONFIG'];

    function config($routeProvider,Config) {
        $routeProvider
            .when('/notifications', {
                templateUrl:  Config.templatesDir + 'Notifications/index.html',
                controller: 'NotificationsHomeController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                resolve: {
                    items : ["AuthService", '$q', 'UserNotificationService', function (ACL, $q, Notification) {
                        return (!ACL.level(5)) ? $q.reject(403) : Notification.get();
                    }]
                },
                name: 'user-notifications-home'
            })
            .when('/notifications/:id', {
                templateUrl:  Config.templatesDir + 'Notifications/edit.html',
                controller: 'NotificationsEditController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                resolve: {
                    item : ["AuthService", '$q', 'UserNotificationService', '$route', function (ACL, $q, Notification, $route) {
                        return (!ACL.level(5)) ? $q.reject(403) : Notification.find($route.current.params.id);
                    }]
                },
                name: 'notification-edit'
            });
    }

})();

},{}],8:[function(require,module,exports){
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

},{}]},{},[6])