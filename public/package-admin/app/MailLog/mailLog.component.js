(function () {
    angular.module('mcms.mailLog')
        .directive('mailLog', Directive);

    Directive.$inject = ['configuration', '$timeout', 'Dialog'];
    DirectiveController.$inject = ['$scope', 'MailLogService', 'core.services', 'lodashFactory', '$mdSidenav'];

    function Directive(Config, $timeout, Dialog) {

        return {
            templateUrl: Config.templatesDir + "MailLog/mailLog.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['mailLog'],
            scope: {
                items: '=items',
                options: '=?options',
                toggleFilters : '=?toggleFilters',
                onSave: '&?onSave',
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    limit : 10
                };

                scope.options = (typeof scope.options == 'undefined' || !scope.options) ? defaults : angular.extend(defaults, scope.options);
                var watcher = scope.$watch('items', function (val) {
                    if (val){
                        controllers[0].init(val);
                        watcher();
                    }
                });

                scope.$watch('toggleFilters', function (val) {
                    if (val){
                        controllers[0].toggleFilters();
                        $timeout(function () {
                            scope.toggleFilters = false;
                            val = false;
                        });
                    }
                });

                scope.fillIframe = function (item) {
                    Dialog.show({
                        title : item.subject,
                        contents : '<iframe id="preview" ng-src="{{ VM.iframeSrc }}" ' +
                        'frameborder="0" style="overflow:hidden;height:100%;width:80%" height="100%" width="80%"></iframe>',
                        locals : {
                            Item :item,
                            iframeSrc : Config.templatesDir + "MailLog/iframe.html"
                        },
                        onComplete : function () {
                            $timeout(function () {
                                $('#preview').contents().find('html').html(item.body);
                            });
                        }
                    });
                }

            }
        };
    }

    function DirectiveController($scope, Log, Helpers, lo, $mdSidenav) {
        var vm = this;
        vm.Items = [];
        vm.Pagination = {};
        vm.boolValues = [
            {
                label: 'Don\'t care',
                value: null
            },
            {
                label: 'Yes',
                value: true
            },
            {
                label: 'No',
                value: false
            }
        ];
        vm.filters = {
            id: null,
            to: null,
            from: null,
            subject: null,
            body: null,
            dateStart: null,
            dateEnd: null,
            dateMode: 'created_at',
            orderBy : 'created_at',
            way : 'DESC',
            page: 1,
            limit : 10
        };

        vm.init = function (items) {
            vm.Pagination = items;
            vm.Items = items.data;
        };

        vm.showMail = function ($event, item) {
            $scope.fillIframe(item)
        };

        vm.toggleFilters = function () {
            $mdSidenav('filters').toggle();
        };

        vm.applyFilters = function () {
            vm.Loading = true;
            Log.get(vm.filters)
                .then(vm.Init)
                .then(function () {
                    vm.Loading = false;
                });
        };

    }
})();
