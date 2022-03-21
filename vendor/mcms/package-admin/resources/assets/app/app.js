(function(){
    'use strict';
    var angularModules = [
        'ngSanitize',
        'ngRoute',
        'ngResource',
        'angular-reverse-url',
        'angular-redactor',
        'ngMessages',
        'ngAnimate',
        'ngAria',
        'ngMaterial',
        'mcms.core',
        'mcms.auth',
        'mcms.components',
        'mcms.lang',
        'mcms.dashBoard',
        'mcms.widgets',
        'mcms.menu',
        'mcms.user',
        'mcms.settingsManager',
        'mcms.tags',
        'mcms.mailLog',
        'mcms.mediaLibrary',
        'mcms.itemSelector',
        'mcms.extraFields',
        'mcms.dynamicTables',
    ];

    if (typeof window.Injectables != 'undefined'){
        angularModules = angularModules.concat(window.Injectables);
    }

    angular.module('mcms', angularModules)
        .config(config)
        .run(startUp);

    startUp.$inject = ['$rootScope', 'configuration', 'UserService', 'AuthService'];
    config.$inject = ['$compileProvider','$routeProvider', '$locationProvider',
        '$mdThemingProvider', 'redactorOptions', 'configuration', '$mdDateLocaleProvider'];

    function startUp($rootScope, Config, UserService, ACL){
        $rootScope.Config = Config;
        UserService.User = window.user;
        // ACL.assignUser(window.user);
    }

    function config($compileProvider,$routeProvider, $locationProvider, $mdThemingProvider, redactorOptions, Config, $mdDateLocaleProvider){
        Config.CSRF = window.CSRF || '';
        Config.Settings = window.Settings || {};
        $compileProvider.debugInfoEnabled(true);
        $locationProvider.html5Mode(false);
        $routeProvider.otherwise('/');
        $locationProvider.hashPrefix('');
        var moment = require('moment');

        $mdDateLocaleProvider.formatDate = function(date) {
            return moment(date).format(Config.defaultDateFormat);
        };


        $mdThemingProvider.definePalette('amazingPaletteName', {

            '50': 'ffebee',
            '100': 'ffcdd2',
            '200': 'ef9a9a',
            '300': 'e57373',
            '400': 'ef5350',
            '500': 'f44336',
            '600': 'e53935',
            '700': 'd32f2f',
            '800': 'c62828',
            '900': 'b71c1c',
            'A100': 'ff8a80',
            'A200': 'ff5252',
            'A400': 'ff1744',
            'A700': 'd50000',
            'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                // on this palette should be dark or light
            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                '200', '300', '400', 'A100'],
            'contrastLightColors': undefined    // could also specify this if default was 'dark'
        });
        $mdThemingProvider.theme('default')
            .primaryPalette('amazingPaletteName');
        for (var i in Config.redactor){
            redactorOptions[i] = Config.redactor[i];
        }

    }

})();

require('./Auth');
require('./Core');
require('./Components');
require('./Lang');
require('./Menu');
require('./DashBoard');
require('./Widgets');
require('./User');
require('./SettingsManager');
require('./ExtraField');
require('./MediaFiles');
require('./FileGallery');
require('./ItemSelector');
require('./Tags');
require('./MailLog');
require('./MediaLibrary');
require('./DynamicTables');
