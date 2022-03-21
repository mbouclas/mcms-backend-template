(function () {
    'use strict';

    angular.module('mcms.menu')
        .factory('ActiveMenu',factory);
    factory.$inject = ['$location', 'mcms.menuService', 'lodashFactory'];

    function factory($location, Menu, lo) {
        return function setActiveMenu() {
            var flatMenu = Menu.flat();
            lo.map(flatMenu, function (item) {//reset
                item.active = false;
            });

            for (var i in flatMenu){
                if (!flatMenu[i].permalink || flatMenu[i].permalink == ''){
                    continue;
                }

                var location = $location.path(),
                    re = new RegExp(flatMenu[i].permalink + '?(\/[0-9])?');

                if (re.test(location)){
                    flatMenu[i].active = true;
                    if (flatMenu[i].parent !== 'root'){
                        //find the parent and expand it
                        var parent = lo.find(flatMenu, {id : flatMenu[i].parent});
                        parent.expand = true;
                        parent.active = true;
                    }
                }
            }
        }
    }
})();
