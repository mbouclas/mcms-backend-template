(function () {
    'use strict';
    const moduleConfig = {
        templatesDir : '/package-builder/templates/',
    };


    const module = angular.module('mcms.builder', [])
        .constant('BUILDER_CONFIG',moduleConfig)
        .config(['$routeProvider', function config($routeProvider) {
            $routeProvider
                .when('/front/build', {
                    templateUrl:  moduleConfig.templatesDir + 'dash.html',
                    controller: 'BuilderDashController',
                    controllerAs: 'VM',
                    reloadOnSearch : false,
                    resolve: {
                        init : ["AuthService", '$q', 'EditableRegionService', function (ACL, $q, ERS) {
                            return (!ACL.inGates('editableRegions.menu')) ? $q.reject(403) : ERS.init();
                        }]
                    },
                    name: 'builder-dash'
                })
        }])
        .service('BuilderService', BuilderService)
        .controller('BuilderDashController', [ 'Dialog', 'BUILDER_CONFIG', 'configuration', 'core.services', 'LangService', '$timeout', 'BuilderService' ,
        function BuilderDashController( Dialog, Config, BuilderConfig, Helpers, Lang, $timeout, service) {
            const vm = this;
            vm.building = false;

            vm.startBuild = function () {
                vm.building = true;
                service.build()
                    .then(res => {
                        console.log(res.data)
                        vm.building = false;
                    })
                    .catch(err => console.log(err))
            }

        }])
        .run(run);

    run.$inject = ['mcms.menuService'];

    function run(Menu) {
        var FrontEndMenu = Menu.find('FrontEnd');

        FrontEndMenu.addChildren([
            Menu.newItem({
                id: 'builder',
                title: 'Builder',
                permalink: '/front/build',
                icon: 'content_copy',
                order : 2
            })
        ]);
    }

    BuilderService.$inject = ['$http', '$q'];
    function BuilderService($http, $q) {
        const _this = this;
        const baseUrl = '/api/builder/build';

        this.build = function() {
            return $http.post(baseUrl, {});
        }
    }

})();