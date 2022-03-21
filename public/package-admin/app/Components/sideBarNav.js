(function() {
    angular.module('mcms.components')
        .directive('sideBarNav', sideBarNav);

    sideBarNav.$inject = ['configuration', '$rootScope'];
    sideBarNavController.$inject = ['mcms.menuService','$location','$mdSidenav', 'AuthService', 'core.services'];

    function sideBarNav(Config, $rootScope){

        return {
            require : 'sideBarNav',
            templateUrl: Config.templatesDir + "Components/sideBarNav.component.html",
            controller: sideBarNavController,
            controllerAs : 'VM',
            restrict : 'E',
            replace : true,
            link : function(scope, element, attrs, controllers){
                scope.isLocked = true;
                $rootScope.$on('sideNav.unlock', function (event, mode) {
                    scope.isLocked = mode || false;
                });
            }
        };
    }

    function sideBarNavController(Menu,$location,$mdSidenav, ACL, Helpers){
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

        vm.myProfile = function () {
            Helpers.redirectTo('edit-user', {id : ACL.getUser().id});
        };
    }
})();
