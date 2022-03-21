(function(){
    'use strict';

    angular.module('mcms.user')
        .directive('latestUsersWidget', Component);

    Component.$inject = ['configuration'];

    function Component(Config){

        return {
            templateUrl: Config.templatesDir + "User/Widgets/latestUsers.widget.html",
            restrict : 'E',
            link : function(scope, element, attrs, controllers){
                scope.Options = {limit : 5, showToolbar : false};

            }
        };
    }
})();
