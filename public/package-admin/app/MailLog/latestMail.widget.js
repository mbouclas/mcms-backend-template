(function(){
    'use strict';

    angular.module('mcms.mailLog')
        .directive('latestMailWidget', Component);

    Component.$inject = ['configuration', 'MailLogService'];

    function Component(Config, Log){

        return {
            templateUrl: Config.templatesDir + "MailLog/latestMail.widget.html",
            restrict : 'E',
            link : function(scope, element, attrs, controllers){
                scope.Options = {limit : 5};
                Log.get({limit : scope.Options.limit}).then(function (res) {
                    scope.Log = res;
                });
            }
        };
    }
})();