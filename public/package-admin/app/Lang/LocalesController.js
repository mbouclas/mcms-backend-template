(function () {
    'use strict';

    angular.module('mcms.lang')
        .controller('LocalesController', Controller);

    Controller.$inject = ['locales', 'LocaleService', 'core.services', 'Dialog'];

    function Controller(Locales, LS, Helpers, Dialog) {
        var vm = this;
        vm.selected = [];
        vm.selectedItem = {};
        vm.searchText = null;
        vm.Locales = LS.locales();
        vm.LocalesAvailable = LS.available();

        vm.itemClick = function ($event) {
            $event.stopPropagation();
        }

        vm.getLocale = function (query) {
            return (!query) ? vm.LocalesAvailable : vm.LocalesAvailable.filter(Helpers.createFilterFor('name', query));
        };

        vm.onLocaleSelected = function (locale) {
            if (typeof locale == 'undefined'){
                return;
            }

            LS.enable(locale)
                .then(function (locale) {
                    vm.searchText = null;
                    vm.selectedItem = {};
                    Helpers.toast(locale.name + ' was enabled');
                });
        };

        vm.disable = function (ev, code) {
            Helpers.confirmDialog(ev, {
                title: 'Are you sure?',
                text: 'This operation cannot be undone. You will not loose any translations,' +
                ' we will simply disable them',
                ok: 'Go ahead!',
                cancel: 'Nope, i changed my mind'
            })
                .then(function () {
                    var localeToBeDeleted = vm.Locales[code];
                    localeToBeDeleted.code = code;
                    LS.disable(localeToBeDeleted)
                        .then(function (res) {
                            Helpers.toast(localeToBeDeleted.name + ' was disabled');
                            vm.Locales = LS.locales();
                        });
                }, function () {

                });

        };


        vm.edit = function (ev, code, onSave) {
            var item = vm.Locales[code];
            onSave = onSave || null;
            Dialog.show({
                title: (item.name || 'Add new'),
                contents: '<locale-component item="VM.item" ' +
                'on-save="VM.onSave(result)"></locale-component>',
                locals: {
                    item: item,
                    onSave: onSave
                }
            });

        };

        vm.setDefault = function (locale) {
            LS.setDefault(locale)
                .then(function (allLocales) {
                    vm.Locales = allLocales;
                    Helpers.toast('Saved!!!');
                })
        };

        function DialogController($scope, $mdDialog) {
            $scope.close = function () {
                $mdDialog.hide();
            };
        }
    }


})();
