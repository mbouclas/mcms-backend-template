(function() {
    angular.module('mcms.components')
        .directive('headerComponent', headerComponent);

    headerComponent.$inject = ['configuration'];
    headerComponentController.$inject = ['mcms.menuService', '$mdSidenav', 'AuthService'];

    function headerComponent(Config){

        return {
            require : 'headerComponent',
            templateUrl: Config.templatesDir + "Components/header.component.html",
            controller: headerComponentController,
            controllerAs : 'VM',
            scope: {},
            restrict : 'E',
            link : function(scope, element, attrs, controllers){
                scope.siteName = Config.Settings.core.siteName || '';
                scope.siteUrl = Config.Settings.site.url;
            }
        };
    }

    function headerComponentController(Menu, $mdSidenav, ACL){
        var vm = this;
        vm.Menu = Menu.get();
        vm.User = ACL.getUser();
        
        vm.toggleMenu = function () {
            $mdSidenav('mainSideNav').toggle();
        };
    }
})();
