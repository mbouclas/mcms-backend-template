(function() {
  'use strict';

  angular.module('mcms.lang', [
      'pascalprecht.translate'
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
                gate : 'translations.menu',
                acl: {
                    type: 'level',
                    permission: '98'
                },
                order : 5
            }),
            Menu.newItem({
                id : 'locales',
                title : 'Locales',
                permalink : '/administrator/lang/locales',
                icon : 'my_location',
                gate : 'locales.menu',
                acl: {
                    type: 'level',
                    permission: '99'
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
        //in the rare case that english is gone missing
        if (typeof window.locales.en == 'undefined'){
            $translateProvider
                .translations('en', window.translations.en);
        }

        $translateProvider
            .useSanitizeValueStrategy('sanitize')
            .preferredLanguage(window.currentLocale || 'en');
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

