(function() {
  'use strict';

  angular.module('mcms.lang', [
      'pascalprecht.translate',
      'md.data.table'
  ])
      .run(run)
      .config(config);


    run.$inject = ['mcms.menuService', 'LangService'];
    config.$inject = ['$translateProvider'];


    function run(Menu, Lang) {
        if (window.locales){
            Lang.locales(window.locales);
        }

        var administratorMenu = Menu.find('administrator');
        administratorMenu.addChildren([
            Menu.newItem({
                id : 'lang',
                title : 'Translations',
                permalink : '/administrator/lang',
                icon : 'language',
                acl: {
                    type: 'role',
                    permission: 'admin'
                },
                order : 5
            }),
            Menu.newItem({
                id : 'locales',
                title : 'Locales',
                permalink : '/administrator/lang/locales',
                icon : 'my_location',
                acl: {
                    type: 'role',
                    permission: 'admin'
                },
                order : 4
            })
        ]);
    }

    function config($translateProvider) {
        if (window.translations && window.locales){
            for (var locale in window.locales){
                $translateProvider
                    .translations(locale, window.translations[locale]);
            }
        }

        $translateProvider
            .useSanitizeValueStrategy('sanitize')
            .preferredLanguage('en');
    }

})();

require('./routes');
require('./LangService');
require('./LocaleService');
require('./langDataService');
require('./localesDataService');
require('./LangController');
require('./LocalesController');
require('./Components/translationComponent');
require('./Components/localeComponent');

