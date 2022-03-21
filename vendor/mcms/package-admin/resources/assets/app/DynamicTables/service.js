(function () {
    'use strict';

    angular.module('mcms.dynamicTables')
        .service('DynamicTableService', Service);

    Service.$inject = ['lodashFactory', 'DynamicTablesDataService', '$q',
        'mcms.settingsManagerService', 'LangService'];

    function Service(lo, DS, $q, SettingsService, Lang) {
        var _this = this,
            Items = [],
            Filter = [],
            Tables = {},
            ModelMap = {};

        this.init = init;
        this.newTable = newTable;
        this.save = save;
        this.getTables = getTables;
        this.addItem = addItem;
        this.get = get;
        this.find = find;
        this.destroy = destroy;
        this.rebuild = rebuild;
        this.tables = tables;
        this.mapModel = mapModel;
        this.mapModelByVal = mapModelByVal;

        function init(filters) {
            return DS.index(filters).then(function (response) {
                Items = response;
                return Items;
            });
        }

        function getTables(model) {
            return DS.getTables(model)
                .then(function (response) {
                    return response;
                });
        }

        function addItem(module, parentId) {
            var newItem = newTable(mapModel(module));

            if (parentId && parseInt(parentId) !== 0) {
                newItem.parent_id = parentId;
                return find(parentId)
                    .then(function (parent) {
                        newItem.parent = parent;
                        return newItem;
                    });
            }

            return $q.resolve(newItem);
        }

        function get(tableId) {
            return DS.getTableItems(tableId)
                .then(function (response) {
                    return response;
                });
        }

        function find(id) {
            return DS.show(id);
        }

        function newTable(modelName) {
            return {
                id: null,
                model: modelName,
                title: Lang.langFields(),
                description: Lang.langFields(),
                slug: '',
                meta: {},
                settings: {},
                active: false,
                orderBy: 0,
            };
        }

        function save(item) {
            if (typeof item.id == 'undefined' || !item.id) {
                return DS.store(item);
            }

            return DS.update(item, item.id);
        }

        function destroy(item) {
            return DS.destroy(item);
        }

        function rebuild(parentId, tree) {
            return DS.rebuild(parentId, tree);
        }


        //sets, retrieves from other services. Acts like a store. The key should be something unique
        function tables(key, items) {
            if (typeof Tables[key] == 'undefined') {
                Tables[key] = [];
            }

            if (typeof items == 'undefined') {
                return Tables[key];
            }

            Tables[key] = items;
        }

        function mapModel(key, value) {
            if (typeof key === 'undefined') {
                return ModelMap;
            }

            if (typeof value === 'undefined') {
                return ModelMap[key];
            }

            ModelMap[key] = value;
        }

        function mapModelByVal(val) {
            if (val.indexOf('\\\\') === -1){
                val = val.replace(/\\/g, '\\\\');
            }

            var found = null;
            lo.forEach(mapModel(), function (item, key) {
               if (item === val) {
                   found = key;
                   return;
               }
            });

            return found;
        }
    }
})();
