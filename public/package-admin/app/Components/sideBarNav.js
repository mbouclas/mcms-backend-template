(function() {
    angular.module('mcms.components')
        .directive('sideBarNav', sideBarNav);

    sideBarNav.$inject = ['configuration'];
    sideBarNavController.$inject = ['mcms.menuService','$location','$mdSidenav', 'AuthService'];

    function sideBarNav(Config){

        return {
            require : 'sideBarNav',
            templateUrl: Config.templatesDir + "Components/sideBarNav.component.html",
            controller: sideBarNavController,
            controllerAs : 'VM',
            restrict : 'E',
            replace : true,
            link : function(scope, element, attrs, controllers){
            }
        };
    }

    function sideBarNavController(Menu,$location,$mdSidenav, ACL){
        var vm = this;
        vm.Menu = Menu.get();
        vm.User = ACL.getUser();

        vm.toggleSideNav = function () {
            $mdSidenav('mainSideNav').close().then(function () {
                console.log('done')
            });
        };

        vm.navigate = function(path){
          $location.path(path);
        };

    }
})();
