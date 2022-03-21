(function () {
    'use strict';

    angular.module('mcms.settingsManager')
        .service('mcms.settingsManagerService', Service);

    Service.$inject = ['lodashFactory', 'LangService', 'SettingsManagerDataService'];

    function Service(lo, Lang, DS) {
        var _this = this;
        var Settings = [],
            Components = [];
        this.types = [
            'text',
            'textArea',
            'number',
            'email',
            'richtext',
            'date',
            'itemSelector',
            'select',
            'selectMultiple',
            'boolean',
            'image',
            'file'
        ];

        this.init = init;
        this.addSettings = addSettings;
        this.addSettingsItem = addSettingsItem;
        this.newItem = newItem;
        this.all = all;
        this.get = get;
        this.find = find;
        this.newSetting = newSetting;
        this.save = save;
        this.destroy = destroy;
        this.components = components;
        this.setComponents = setComponents;
        this.addField = addField;
        this.setUpField = setUpField;
        this.cleanUpFieldModel = cleanUpFieldModel;
        this.convertFieldToSchema = convertFieldToSchema;
        this.ensureUniqueBoolean = ensureUniqueBoolean;
        this.reverseFieldToEditable = reverseFieldToEditable;
        this.randomId = randomId;

        function init() {
            return DS.index();
        }

        function all() {
            return Settings;
        }

        function get(where) {
            var found = lo.find(Settings, where);
            if (!found) {
                return null;
            }

            return found.config;
        }

        function find(id, justFields) {
            return DS.show(id)
                .then(function (response) {
                    return (justFields) ? response.fields : response;
                });
        }

        function newSetting() {
            return {
                name: '',
                slug: '',
                item_id: '',
                model: '',
                fields: [],
                settings: {},
            };
        }

        function save(item) {
            if (!item.id) {
                return DS.store(item);
            }

            return DS.update(item);
        }

        function destroy(item) {
            return DS.destroy(item.id);
        }

        function addSettings(settings) {
            for (var i in settings) {
                _this.addSettingsItem(settings[i]);
            }

            return _this;
        }

        function addSettingsItem(item) {
            Settings.push(item);
            return _this;
        }

        function newItem(item) {
            var template = angular.copy({
                module: '',
                component: '',
                varName: '',
                title: '',
                type: '',
                orderBy: 0,
                options: []
            });

            return angular.extend(template, item);
        }

        function components() {
            return Components;
        }

        function setComponents(components) {
            Components = components;
        }

        function addField(type) {
            var field = lo.find(Components, {type: type});
            if (!field) {
                field = lo.find(Components, {type: 'text'});
            }

            lo.forEach(field.params, function (param) {
                param = setParamValues(param);
            });

            lo.forEach(field.settings, function (param) {
                param = setParamValues(param);
            });

            lo.forEach(field.config, function (param) {
                param = setParamValues(param);
            });

            return field;
        }

        function setParamValues(param) {
            param.value = (typeof param.value == 'undefined') ? '' : param.value;
            if (param.type == 'boolean') {
                param.value = (param.default) ? param.default : false;
            }

            if (param.type == 'select') {
                var defaultValue = lo.find(param.options, {default: true});
                param.value = (defaultValue) ? defaultValue.value : null;
            }

            if (param.type == 'selectMultiple') {
                param.value = (defaultValue) ? defaultValue.value : null;
            }

            if (typeof param.multilingual != 'undefined' && param.multilingual) {
                param.value = Lang.langFields();
            }

            if (param.params) {//nested like options
                param.value = [];
            }

            return param;
        }

        function setUpField(type, param) {
            var field;

            if (type == 'text' || type == 'boolean') {
                field = {
                    type: type,
                    id: param.id || null,
                    value: ''
                };
            }

            else if (lo.isObject(type)) {
                var params = {};
                field = [];
                //options of some sort
                for (var i in type) {
                    params[i] = setUpField(type[i], i);
                }
                field.push(params);
            }

            return field;
        }

        function cleanUpFieldModel(model) {
            var copy = angular.copy(model);
            copy.model = {};

            for (var i in model.model) {
                copy.model[i] = model.model[i].value;
            }

            return copy;
        }

        function convertFieldToSchema(model, type) {
            var sanitizedModel = {};
            if (typeof type != 'undefined') {
                sanitizedModel.type = type;
            }

            lo.forEach(model, function (item, key) {
                sanitizedModel[key] = item.value;
                if (typeof item.value == 'undefined' && item.type == 'boolean') {
                    sanitizedModel[key] = false;
                }

                if (lo.isArray(item.value) && !item.multilingual && item.type !== 'selectMultiple') {
                    //need to convert it as it is an array
                    sanitizedModel[key] = [];
                    for (var i in item.value) {
                        sanitizedModel[key].push(convertFieldToSchema(item.value[i]));
                    }
                }
            });
            return sanitizedModel;
        }

        function ensureUniqueBoolean(field, name, arrayOfItems) {
            lo.map(arrayOfItems, function (item, key) {
                item[name].value = false;
            });
            //set this one to true
            field.value = true;
        }

        function reverseFieldToEditable(model) {
            //find component
            var component = lo.find(Components, {type: model.type}),
                schema = addField(model.type);
            //now loop through the schema to fill in the values
            fillSchemaValues(schema.params, model);
            if (typeof schema.config != 'undefined') {
                fillSchemaValues(schema.config, model.config);
            }

            if (typeof schema.settings != 'undefined') {
                fillSchemaValues(schema.settings, model.settings);
            }

            return schema;
        }

        function fillSchemaValues(schema, model) {

            lo.forEach(schema, function (param, key) {
                param.randomId = randomId(key);
                if (typeof model == 'undefined') {
                    model = {};
                }
                if (lo.isArray(model[key]) && param.type !== 'selectMultiple') {
                    param.value = [];
                    for (var i in model[key]) {
                        var template = angular.copy(param.params);
                        for (var j in model[key][i]) {
                            template[j].randomId = randomId(j);
                            template[j].value = model[key][i][j];//assign value directly
                        }

                        param.value.push(template);
                    }
                }
                else {
                    param.value = model[key];
                }
            });

            return schema;
        }

        function randomId(key) {
            return key + '-' + (String(Math.random()).replace('0.', ''));
        }
    }
})();
