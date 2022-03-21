(function () {
    angular.module('mcms.user')
        .directive('userSelector', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'UserService', 'lodashFactory', '$q', 'core.services'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "User/userSelector.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['userSelector', 'ngModel'],
            scope: {
                options: '=?options',
                showCurrentUser : '=?showCurrentUser',
                onSelect: '&?onSelect',
                ngModel: '=ngModel'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    limit : 50
                };
                               
                scope.options = (typeof scope.options == 'undefined' || !scope.options) ? defaults : angular.extend(defaults, scope.options);

                var watcher = scope.$watch('ngModel', function (val) {
                    if (!val){
                        return;
                    }

                    controllers[0].init(val);
                    watcher();
                });
            }
        };
    }

    function DirectiveController($scope, User, lo, $q, Helpers) {
        var vm = this;
        vm.Model = {};
        vm.Users = [];
        vm.searchText = '';

        this.init = function (uid) {
            var tasks = [
                // User.get({limit : 10})
            ];


            //go find this user if it is set as an option
            if ($scope.showCurrentUser){
                tasks.push(User.find(uid));
            }

            $q.all(tasks)
                .then(function (results) {
                    vm.Model = results[0];
                });

        };

        vm.getUsers = function (query) {

/*            if (vm.Users.length > 0){
                return (!query) ? vm.Users : vm.Users.filter( Helpers.createFilterFor('fullName',query) );
            }*/

            return User.get(angular.extend({limit : 10, active: true}, $scope.options))
                .then(function (res) {
                    vm.Users = res.data;
                    return (!query) ? res.data : res.data.filter( Helpers.createFilterFor('fullName',query) );
                });
        };

        vm.onUserSelected = function (user) {
            if (typeof user == 'undefined' || !user){
                return;
            }

            if (typeof $scope.onSelect == 'function'){
                $scope.onSelect(user);
            }

            if (lo.isArray($scope.ngModel)){
                vm.searchText = null;
                if (lo.findIndex($scope.ngModel, {id : user.id}) != -1){
                    return;
                }

                $scope.ngModel.push(user);

                return;
            }



            $scope.ngModel = user.id;
            vm.Model = user;
        };

    }
})();
