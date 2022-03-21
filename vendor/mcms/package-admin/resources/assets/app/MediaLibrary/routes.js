(function() {
    'use strict';

    angular.module('mcms.mediaLibrary')
        .config(config);

    config.$inject = ['$routeProvider','configuration'];

    function config($routeProvider,Config) {
        $routeProvider
            .when('/mediaLibrary', {
                templateUrl: Config.templatesDir + 'MediaLibrary/index.html',
                controller: 'MediaLibraryHomeController',
                controllerAs: 'VM',
                name: 'media-library'
            });

    }

})();
