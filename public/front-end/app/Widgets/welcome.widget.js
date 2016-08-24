(function(){
    'use strict';

    angular.module('mcms.frontEnd.widgets')
        .directive('welcomeWidget', Component);

    Component.$inject = ['FRONTEND_CONFIG', '$filter'];

    function Component(Config, $filter){

        return {
            templateUrl: Config.templatesDir + "Widgets/welcome.widget.html",
            restrict : 'E',
            link : function(scope, element, attrs, controllers){
                // $location.path($filter('reverseUrl')('pages-edit',{id : id}).replace('#',''));
                scope.Items = [
                    {
                        title : 'Manage your users',
                        href  : $filter('reverseUrl')('user-manager'),
                        description : 'Add/remove/edit system users'
                    },
                    {
                        title : 'Manage your menus',
                        href  : $filter('reverseUrl')('menu-manager'),
                        description : 'Add/remove/edit website menus'
                    },
                    {
                        title : 'Translate your site',
                        href  : $filter('reverseUrl')('lang'),
                        description : 'Add/remove/edit website translations'
                    }
                ];
            }
        };
    }
})();