(function () {
    angular.module('mcms.mediaLibrary')
        .directive('mediaLibrary', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'Dialog', 'core.services', 'lodashFactory'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "MediaLibrary/mediaLibrary.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['mediaLibrary'],
            scope: {
                options: '=?options',
                toggleFilters : '=?toggleFilters',
                onSelect: '&?onSelect',
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    limit : 50
                };

                scope.options = (typeof scope.options == 'undefined' || !scope.options) ? defaults : angular.extend(defaults, scope.options);

            }
        };
    }

    function DirectiveController($scope, Dialog, Helpers, lo) {
        var vm = this;

        vm.showLibrary = function () {
            Dialog.show({
                title : 'Media Library',
                contents : '<media-library-contents on-select="VM.onSelect(item)"></media-library-contents>',
                locals : {
                    onSelect : vm.onSelect
                }
            });
        };

        vm.onSelect = function (item) {
            if (typeof $scope.onSelect == 'function'){
                $scope.onSelect({item : item});
            }
        }
    }
})();
