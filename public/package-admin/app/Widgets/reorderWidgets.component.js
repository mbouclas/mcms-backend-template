(function () {
    angular.module('mcms.widgets')
        .directive('reorderWidgets', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'lodashFactory'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "Widgets/reorderWidgets.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require: ['reorderWidgets', 'ngModel'],
            scope: {
                model: '=ngModel',
                widgets  : '=widgets',
                options: '=?options',
                onReorder: '&?onReorder',
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {

                };

                scope.options = (typeof scope.options == 'undefined' || !scope.options) ? defaults : angular.extend(defaults, scope.options);
                controllers[0].init(scope.model, scope.widgets);
            }
        };
    }

    function DirectiveController($scope, lo) {
        var vm = this;
        vm.Widgets = [];
        vm.Model = {};

        vm.init = function (model, widgets) {
          vm.Widgets = widgets;
          vm.Model = model || vm.Model;
        };

        vm.save = function () {
          if (typeof $scope.onReorder == 'function'){
              $scope.onReorder({newOrder : vm.Model});
          }
        };

    }
})();
