(function () {
    'use strict';

    angular.module('mcms.lang')
        .service('LocaleService', Service);

    Service.$inject = ['LocaleDataService', '$q', 'lodashFactory', 'LangService'];

    function Service(DS, $q, lo, Lang) {
        var _this = this;
        var Locales = [],
            LocalesAvailable,
            DefaultLang = 'en';

        this.init = init;
        this.get = get;
        this.locales = locales;
        this.available = available;
        this.groups = groups;
        this.locales = locales;
        this.defaultLang = defaultLang;
        this.enable = enable;
        this.disable = disable;
        this.update = update;
        this.find = find;
        this.setDefault = setDefault;


        function init() {
            return DS.init().then(function (bootData) {
                Locales = bootData.locales;
                LocalesAvailable = localesToArray(bootData.localesAvailable);
                DefaultLang = bootData.defaultLang;
                return bootData.locales;
            });
        }

        function get(filters) {
            return DS.get(filters);
        }

        function groups() {
            return Groups;
        }

        function locales() {
            return Locales;
        }

        function defaultLang() {
            return DefaultLang;
        }

        function available() {
            return LocalesAvailable;
        }

        function localesToArray(locales) {
            var res = [];
            for (var i in locales){
                var temp = locales[i];
                temp.code = i;
                res.push(temp);
            }

            return res;
        }

        function enable(locale) {
            if (typeof locale == 'undefined' || typeof locale.code == 'undefined'){
                return;
            }

            return DS.enable(locale.code)
                .then(function (res) {
                    Locales[locale.code] = locale;
                    return locale;
                });
        }

        function disable(locale) {

            return DS.disable(locale.code)
                .then(function (res) {
                    delete Locales[locale.code];
                    return res;
                });
        }

        function update(locale) {
            return DS.update(locale);
        }

        function find(query) {
            return lo.find(LocalesAvailable, query);
        }

        function setDefault(locale) {
            return DS.setDefault(locale)
                .then(function () {
                    for (var i in Locales){
                        Locales[i].default = false;
                        if (i == locale.code){
                            Locales[i].default = true;
                        }
                    }
                    DefaultLang = locale;
                    Lang.setDefaultLang(locale.code);
                    return Locales;
                });
        }

    }
})();

