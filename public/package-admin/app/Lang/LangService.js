(function () {
    'use strict';

    angular.module('mcms.lang')
        .service('LangService', Service);

    Service.$inject = ['LangDataService', '$q', 'lodashFactory'];

    function Service(Lang, $q, lo) {
        var _this = this;
        var Groups = [],
            Locales = [],
            DefaultLang = 'en';

        this.init = init;
        this.get = get;
        this.locales = locales;
        this.groups = groups;
        this.locales = locales;
        this.defaultLang = defaultLang;
        this.normalizeItem = normalizeItem;
        this.newItem = newItem;
        this.save = save;
        this.delete = deleteItems;
        this.langFields = langFields;

        function init() {
            return Lang.init().then(function (bootData) {
                Groups = bootData.groups;
                Locales = bootData.locales;
                DefaultLang = bootData.defaultLang;
                return bootData.translations;
            });
        }

        function get(filters) {
            return Lang.get(filters);
        }

        function groups() {
            return Groups;
        }

        function locales(locales) {
            var allLocales = [];
            if (locales){
                Locales = locales;
                for (var i in locales){
                    allLocales.push(locales[i]);

                    if (typeof locales[i].default != 'undefined' && locales[i].default){
                        DefaultLang = i;
                    }
                }
            }
            
            return Locales;
        }

        function defaultLang() {
            return DefaultLang;
        }

        /**
         * Fill in any missing locale keys to avoid chaos
         *
         * @param item
         */
        function normalizeItem(item) {
            item = fillInMissingLocales(item);


            return item;
        }

        function newItem() {
            var newItem = {
                key : '',
                group : ''
            };

            newItem = fillInMissingLocales(newItem);
            return angular.copy(newItem);
        }

        function fillInMissingLocales(item) {
            lo.forEach(Locales,function (locale, key) {
                if (typeof item[key] == 'undefined' || !item[key]){
                    item[key] = {
                        value : '',
                        status : false,
                        locale : key,
                        group : item.group
                    };
                }

                item[key].status = (item[key].status === 1);
            });

            return item;
        }

        /**
         * mode can be create - update - delete
         *
         * @param item
         * @param mode
         * @returns {*}
         */
        function save(item, mode) {
            mode = mode || 'create';
            return Lang[mode](item);
        }

        function deleteItems(items) {
            var toDelete = [];
            for (var i in items){
                toDelete.push(items[i].key);
            }

            return Lang.delete(toDelete);
        }

        function langFields() {
            var fields = {};
            lo.forEach(Locales ,function (locale, key) {
                fields[key] = '';
            });

            return fields;
        }
    }
})();

