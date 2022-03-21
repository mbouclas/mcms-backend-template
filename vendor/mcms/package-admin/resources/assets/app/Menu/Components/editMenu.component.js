(function () {
    angular.module('mcms.menu')
        .directive('editMenu', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'core.services', 'configuration', 'MenuService', 'lodashFactory'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "Menu/Components/editMenu.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['editMenu'],
            scope: {
                options: '=?options',
                menu: '=?menu',
                onSave : '&?onSave'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true
                };

                scope.ValidationMessagesTemplate = Config.validationMessages;

                controllers[0].init(scope.menu);
                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
            }
        };
    }

    function DirectiveController($scope, Helpers, Config, Menu, lo) {
        var vm = this;
        vm.Menu = {};
        vm.ValidationMessagesTemplate = Config.validationMessages;
        vm.init = function (menu) {
            if (typeof menu.settings == 'undefined' || lo.isArray(menu.settings)){
                menu.settings = {};
            }

            if (typeof menu.settings.extraFields == 'undefined'){
                menu.settings.extraFields = [];
            }
            vm.Menu = menu;
        };

        vm.save = function(){
            Menu.save(vm.Menu)
                .then(function (result) {
                    Helpers.toast('Saved!');
                    var isNew = (typeof vm.Menu.id == 'undefined');
                    if (isNew){
                        vm.Menu = result;
                        vm.Menu.children = [];
                    }

                    if (typeof $scope.onSave == 'function'){
                        $scope.onSave({menu : result, isNew : isNew});
                    }
                });
        }
    }
})();
