(function() {
    'use strict';

    angular.module('mcms.frontEnd.editableRegions')
        .controller('EditableRegionController',Controller);

    Controller.$inject = ['Region', 'Dialog', 'FRONTEND_CONFIG', 'configuration',
        'EditableRegionService', 'core.services', 'LangService'];

    function Controller(Region, Dialog, Config, BaseConfig, ERS, Helpers, Lang) {
        var vm = this;
        vm.tmpModel = {};
        vm.Region = Region;
        vm.defaultLang = Lang.defaultLang();
        vm.Locales = Lang.locales();

        vm.add = function (region, item) {

            Dialog.show({
                title : 'Add items ',
                contents : '<editable-region region="VM.region" item="VM.item" ' +
                'on-select-item="VM.onSelectItem(region, item, isNew)"></editable-region>',
                locals : {
                    item : item,
                    region : region,
                    onSelectItem : vm.onSelectItem
                }
            });
        };

        vm.edit = function (region) {

            Dialog.show({
                title : 'edit ' + region.label,
                templateUrl : Config.templatesDir + 'EditableRegions/editRegion.html',
                locals : {
                    Region : region,
                    ValidationMessagesTemplate : BaseConfig.validationMessages,
                    onSave : vm.updateRegion,
                    save : vm.save
                }
            });
        };

        vm.updateRegion = function (region) {

        };

        vm.save = function () {
            ERS.update(vm.Region.name, vm.Region)
                .then(function () {
                    Helpers.toast('Saved!');
                });
        };

        vm.onSelectItem = function (region, item, isNew) {
            if (isNew){
                region.items.push(item);
            }

            Dialog.close();
        };

        vm.delete = function (region, index) {
          region.items.splice(index, 1);
        };
    }

})();
