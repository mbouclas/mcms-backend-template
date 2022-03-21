(function () {
    angular.module('mcms.mediaLibrary')
        .directive('editMediaLibraryItem', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'MediaLibraryService', 'core.services', 'lodashFactory', 'configuration'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "MediaLibrary/editMediaLibraryItem.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['editMediaLibraryItem', 'ngModel'],
            scope: {
                options: '=?options',
                ngModel : '=ngModel',
                onSave: '&?onSave',
                onDelete: '&?onDelete',
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {

                };

                scope.options = (typeof scope.options == 'undefined' || !scope.options) ? defaults : angular.extend(defaults, scope.options);

            }
        };
    }

    function DirectiveController($scope, MLS, Helpers, lo, Config) {
        var vm = this;

        vm.Item = {};

        vm.ValidationMessagesTemplate = Config.validationMessages;

        MLS.find($scope.ngModel).then(function (item) {
            vm.Item = item;
        });

        vm.save = function () {
            MLS.save(vm.Item)
                .then(function (result) {
                    if (typeof $scope.onSave == 'function'){
                        $scope.onSave({item : result});
                    }

                    Helpers.toast('Saved!!!');
                });
        };

        vm.delete = function () {
            Helpers.confirmDialog({}, {})
                .then(function () {
                    MLS.destroy(vm.Item)
                        .then(function () {
                            $scope.onDelete({item : vm.Item});
                            Helpers.toast('Deleted');
                        });
                });
        }
    }
})();
