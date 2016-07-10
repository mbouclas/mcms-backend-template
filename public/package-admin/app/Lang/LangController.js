(function () {
    'use strict';

    angular.module('mcms.lang')
        .controller('LangController', Controller);

    Controller.$inject = ['translations', 'LangService', '$mdSidenav', 'Dialog', 'core.services'];

    function Controller(Translations, Lang, $mdSidenav, Dialog, Helpers) {
        var vm = this;
        vm.filters = {
            status: null,
            key: null,
            value: null,
            group: null,
            page: 1
        };
        vm.boolValues = [
            {
                label: 'Don\'t care',
                value: null
            },
            {
                label: 'Yes',
                value: true
            },
            {
                label: 'No',
                value: false
            }
        ];
        vm.selected = [];
        vm.defaultLang = Lang.defaultLang();
        vm.Translations = Translations.data;
        vm.Pagination = Translations.pagination;

        function filter() {
            return Lang.get(vm.filters)
                .then(function (res) {
                    vm.Translations = res.data;
                    vm.Pagination = res.pagination;
                });
        }

        vm.changePage = function (page, limit) {
            vm.filters.page = page;
            filter();
        };

        vm.applyFilters = function () {
            filter();
        };

        vm.toggleFilters = function () {
            $mdSidenav('filters').toggle();
        };

        vm.add = function (ev) {
            ev.stopPropagation();
            showDialog(ev, Lang.newItem(), onCreatedDone);
        };

        vm.quickEdit = function (ev, item) {
            ev.stopPropagation();
            showDialog(ev, item, onUpdateDone);
        };

        vm.delete = function (ev) {
            Helpers.confirmDialog(ev, {
                title : 'Are you sure?',
                text : 'This operation cannot be undone.',
                ok : 'Go ahead!',
                cancel : 'Nope, i changed my mind'
            })
                .then(function () {
                    Lang.delete(vm.selected)
                        .then(function () {
                            vm.selected = [];
                            filter();
                        });
                }, function () {

                });

        };

        function showDialog(ev, item, onSave) {
            onSave = onSave || null;
            var action = (!item.key) ? 'create' : 'update';
            Dialog.show({
                title : (item.key || 'Add new'),
                contents : '<translation-component item="VM.item" action="VM.mode" ' +
                'on-save="VM.onSave(result)"></translation-component>',
                locals : {
                    item: item,
                    action: action,
                    onSave: onSave
                }
            });
/*            $mdDialog.show({
                controller: DialogController,
                template: '<md-dialog aria-label="' + (item.key || 'Add new') + '">' +
                '<md-toolbar><div class="md-toolbar-tools"><h2>' + (item.key || 'Add new') + '</h2>' +
                '<div flex=""></div> ' +
                '<md-button class="md-icon-button" ng-click="close()">' +
                '<md-icon  class="material-icons">close</md-icon>' +
                '</md-button>' +
                ' </div></md-toolbar>' +
                '<md-dialog-content style="min-width: 600px;">' +
                '<translation-component item="VM.item" action="VM.mode" ' +
                'on-save="VM.onSave(result)"></translation-component>' +
                '</md-dialog-content>' +
                '</md-dialog>',
                locals: {
                    item: item,
                    action: action,
                    onSave: onSave
                },
                bindToController: true,
                controllerAs: 'VM',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true
            })
                .then(function (answer) {

                }, function () {
                });*/
        }

        function DialogController($scope, $mdDialog) {
            $scope.close = function () {
                $mdDialog.hide();
            };
        }

        function onUpdateDone(result) {
            console.log('Result', result);
            $mdDialog.hide();
        }

        function onCreatedDone(result) {
            $mdDialog.hide();
            filter();//refresh the results with everything new
        }
    }

})();
