(function () {
    'use strict';

    angular.module('mcms.lang')
        .controller('LangController', Controller);

    Controller.$inject = ['translations', 'LangService', '$mdSidenav', 'Dialog', 'core.services', 'BottomSheet', '$rootScope'];

    function Controller(Translations, Lang, $mdSidenav, Dialog, Helpers, BottomSheet, $rootScope) {
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

        vm.showActions = function (ev, item) {
            BottomSheet.show({
                item : item,
                title : 'Edit ' + item.key
            },[
                { name: 'Edit', icon: 'edit', fn : vm.quickEdit },
                { name: 'Delete', icon: 'delete', fn : vm.delete },
            ]);
        };
        vm.Groups = Lang.groups();

        function filter() {
            vm.Loading = true;
            vm.Translations = [];

            return Lang.get(vm.filters)
                .then(function (res) {
                    vm.Loading = false;
                    vm.Translations = res.data;
                    vm.Pagination = res.pagination;
                    $rootScope.$broadcast('scroll.to.top');

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
            showDialog(Lang.newItem(), onCreatedDone);
        };

        vm.quickEdit = function ( item) {
            showDialog(item, onUpdateDone);
        };

        vm.sync = function () {
            return Lang.sync().then(function () {
                Helpers.toast('done!!!');
            });
        };

        vm.delete = function (item) {
            Helpers.confirmDialog({}, {
                title : 'Are you sure?',
                text : 'This operation cannot be undone.',
                ok : 'Go ahead!',
                cancel : 'Nope, i changed my mind'
            })
                .then(function () {
                    Lang.delete(item)
                        .then(function () {
                            vm.sync().then(function () {
                                Helpers.toast('done!!!');
                                filter();
                            });

                        });
                }, function () {

                });

        };

        function showDialog(item, onSave) {
            onSave = onSave || null;
            var action = (!item.key) ? 'create' : 'update';
            Dialog.show({
                title : (item.key || 'Add new'),
                contents : '<translation-component item="VM.item" action="VM.action" ' +
                'on-save="VM.onSave(result)"></translation-component>',
                locals : {
                    item: item,
                    action: action,
                    onSave: onSave
                }
            });
        }

        function DialogController($scope, $mdDialog) {
            $scope.close = function () {
                Dialog.close();
            };
        }

        function onUpdateDone(result) {
            Dialog.close();
        }

        function onCreatedDone(result) {
            Dialog.close();
            filter();//refresh the results with everything new
        }
    }

})();
