(function () {
    'use strict';

    angular.module('mcms.extraFields')
        .service('ExtraFieldService', Service);

    Service.$inject = ['lodashFactory', 'ExtraFieldsDataService', '$q', 'mcms.settingsManagerService'];

    function Service(lo, DS, $q, SettingsService) {
        var _this = this,
            Items = [],
            Filter = [];

        this.init = init;
        this.newItem = newItem;
        this.save = save;
        this.get = get;
        this.find = find;
        this.destroy = destroy;
        this.convertFromMysqlFormat = convertFromMysqlFormat;
        this.convertToMysqlFormat = convertToMysqlFormat;
        this.convertFieldsFromMysql = convertFieldsFromMysql;
        this.simplifyFromMysql = simplifyFromMysql;
        this.filter = filter;
        this.where = where;
        this.whereIn = whereIn;

        function init(filters) {
            return DS.index(filters).then(function (response) {
                Items = response;
                return Items;
            });
        }

        function get(filters) {
            return DS.index(filters)
                .then(function (response) {
                    //the fields are in php format, convert them to the expected one
                    response.fields = convertFieldsFromMysql(response.fields);

                    return response;
                });
        }

        function find(id) {
            return DS.show(id);
        }

        function newItem() {
            return {
                id: null,
                model: null,
                title: '',
                slug: '',
                varName: '',
                type: '',
                meta: {},
                settings: {},
                active: false,
                orderBy: 0,
            };
        }

        function save(item, id) {
            if (typeof id == 'undefined' || !id) {
                return DS.store(item);
            }

            return DS.update(item, id);
        }

        function destroy(item) {
            return DS.destroy(item.id);
        }

        function convertFromMysqlFormat(field) {
            var ret = angular.copy(field);
            if (lo.isObject(ret.meta)) {
                for (var key in ret.meta) {
                    ret[key] = ret.meta[key]
                }
            }

            return ret;
        }

        function convertToMysqlFormat(field, originalModel) {

            var base = SettingsService.convertFieldToSchema(field.params, field.type),
                ret = angular.copy(originalModel);

            if (typeof field.config != 'undefined') {
                base.config = SettingsService.convertFieldToSchema(field.config, field.type);
            }

            if (typeof field.settings != 'undefined') {
                base.settings = SettingsService.convertFieldToSchema(field.settings, field.type);
            }

            ret.label = base.label;
            ret.type = base.type;
            ret.varName = base.varName;
            delete base.label;
            delete base.type;
            delete base.varName;
            ret.meta = base;

            return ret;
        }

        function convertFieldsFromMysql(fields) {
            return lo.map(fields, function (field) {
                return convertFromMysqlFormat(field);
            });
        }

        function simplifyFromMysql(fields) {
            var arr = {};
            if (!lo.isObject(fields)) {
                return arr;
            }

            lo.map(fields, function (field) {
                var jsonVal = lo.attempt(JSON.parse.bind(null, field.value));
                arr[field.field.varName] = (lo.isError(jsonVal)) ? field.value : jsonVal;
            });

            return arr;
        }

        function filter(arr) {
            Filter = arr;

            return _this;
        }

        function where(key, value) {
            return lo.filter(Filter, function (item) {
                if (item[key] == value) {
                    return item;
                }
            });
        }

        function whereIn(key, value) {
            return lo.filter(Filter, function (item) {
                if (typeof item[key] == 'undefined') {
                    //return all unusigned fields when the item was never assigned one
                    if ((lo.isString(value) && value === '') || !value || value.length == 0) {
                        return item;
                    }

                    return false;
                }

                if (item[key].indexOf(value) != -1) {
                    return item;
                }

                //return all unusigned fields
                if ((lo.isString(value) && value === '') || !value || value.length == 0) {
                    return item;
                }

                return false;
            });
        }


    }
})();
