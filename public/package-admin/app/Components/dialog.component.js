(function () {
    angular.module('mcms.components')
        .service('Dialog', Service);


    Service.$inject = ['$mdDialog'];
    DialogController.$inject = ['$scope', '$mdDialog'];


    function Service($mdDialog) {
        var _this = this;

        this.show = show;
        this.close = close;

        function show(options) {
            var dialog = {
                locals: {},
                controller: DialogController,
                bindToController: true,
                controllerAs: 'VM',
                parent: angular.element(document.body),
                // targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true
            };

            dialog = angular.extend(dialog, options);

            if (!dialog.templateUrl) {
                dialog.template = '<md-dialog aria-label="' + dialog.title + '">' +
                    '<md-toolbar><div class="md-toolbar-tools"><h2>' + dialog.title + '</h2>' +
                    '<div flex=""></div> ' +
                    '<md-button class="md-icon-button" ng-click="close()">' +
                    '<md-icon  class="material-icons">close</md-icon>' +
                    '</md-button>' +
                    ' </div></md-toolbar>' +
                    '<md-dialog-content style="min-width: 600px;">' +
                    '<md-content layout-padding="">' + dialog.contents + '</md-content>' +
                    '</md-dialog-content>' +
                    '</md-dialog>';
            }

            return $mdDialog.show(dialog);
        }

        function close() {
            $mdDialog.hide();
        }
    }

    function DialogController($scope, $mdDialog) {
        $scope.close = function () {
            $mdDialog.hide();
        };
    }
})();
