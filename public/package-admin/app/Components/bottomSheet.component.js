(function() {
    angular.module('mcms.components')
        .service('BottomSheet', Service);

    Service.$inject = ['$mdBottomSheet', 'configuration'];


    function Service($mdBottomSheet, Config) {
        var _this = this;
        this.show = show;

        function show(options, actions) {
            var defaults = {
                    title: 'Actions',
                    item : {}
                },
                defaultActions = [
                    { name: 'Edit', icon: 'edit', fn : '' },
                    { name: 'Disable', icon: 'block', fn : '' },
                    { name: 'Delete', icon: 'delete', fn : '' },
                ],
                Properties = angular.extend(defaults, options);

            Properties.Actions = actions || defaultActions;

            $mdBottomSheet.show({
                templateUrl: Config.templatesDir + "Components/BottomSheet.component.html",
                controller: ActionsController,
                controllerAs : 'VM',
                locals : Properties
            });

            function ActionsController($scope, item) {
                $scope.Actions = Properties.Actions;
                $scope.title = Properties.title;

                $scope.listItemClick = function($index) {
                    var clickedItem = Properties.Actions[$index];
                    Properties.Actions[$index].fn(item);
                    $mdBottomSheet.hide(clickedItem);
                };
            }
        }

    }
})();
