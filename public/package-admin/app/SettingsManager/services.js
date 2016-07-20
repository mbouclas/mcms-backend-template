(function () {
    'use strict';

    angular.module('mcms.settingsManager')
        .service('mcms.settingsManagerService',Service);

    Service.$inject = ['lodashFactory'];

    function Service(lo) {
        var _this = this;
        var Settings = [];
        this.types = [
                'text',
                'textArea',
                'select',
                'boolean',
                'image',
                'file'
            ];

        this.addSettings = addSettings;
        this.addSettingsItem = addSettingsItem;
        this.newItem = newItem;
        this.all = all;
        this.get = get;


        function all() {
            return Settings;
        }

        function get(where) {
            var found = lo.find(Settings,where);
            if (!found){
                return null;
            }

            return found.config;
        }

        function addSettings(settings) {
            for (var i in settings){
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
                module : '',
                component : '',
                varName : '',
                title : '',
                type : '',
                orderBy : 0,
                options : []
            });

            return angular.extend(template,item);
        }

    }
})();
