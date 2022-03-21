(function() {
    'use strict';

    angular.module('mcms.lang')
        .config(config);

    config.$inject = ['$routeProvider','configuration'];

    function config($routeProvider,Config) {
        $routeProvider
            .when('/administrator/lang', {
                templateUrl:  Config.templatesDir + 'Lang/index.html',
                controller: 'LangController',
                controllerAs: 'VM',
                reloadOnSearch : false,
                resolve: {
                    translations : ["AuthService", 'LangService', '$q', function (ACL, Lang, $q) {
                        return (!ACL.inGates('translations.menu')) ? $q.reject(403) : Lang.init();
                    }]
                },
                name: 'lang'
            })
            .when('/administrator/lang/locales', {
                templateUrl:  Config.templatesDir + 'Lang/locales.html',
                controller: 'LocalesController',
                controllerAs: 'VM',
                resolve: {
                    locales : ["AuthService", 'LocaleService', '$q', function (ACL, Locales, $q) {
                        return (!ACL.inGates('locales.menu')) ? $q.reject(403) : Locales.init();
                    }]
                },
                name: 'lang-locales'
            });

    }

})();
