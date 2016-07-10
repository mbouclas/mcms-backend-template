(function() {
    'use strict';

    angular.module('mcms.pages.page')
        .controller('PageController',Controller);

    Controller.$inject = ['item', 'LangService', '$location', '$filter'];

    function Controller(Item, Lang, $location, $filter) {
        var vm = this;

        vm.Item = Item;
        vm.defaultLang = Lang.defaultLang();

        vm.onSave = function (item, isNew) {
            if (isNew){
                $location.path($filter('reverseUrl')('pages-edit',{id : item.id}).replace('#',''));
            }
        }
    }

})();
