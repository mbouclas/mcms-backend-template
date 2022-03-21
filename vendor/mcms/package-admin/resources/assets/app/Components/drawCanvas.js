(function() {
    angular.module('mcms.components')
        .directive('drawCanvas', Component);

    Component.$inject = ['$timeout']

    function Component($timeout){

        return {
            scope: {
                text : '=drawCanvas'
            },
            restrict : 'A',
            link : function(scope, element, attrs, controllers){
                $timeout(function () {
                    var canvas = document.getElementById(element.attr('id'));
                    var context = canvas.getContext("2d");
                    context.rect(0, 0, attrs.width, attrs.height);
                    context.fillStyle = attrs.backgroundColor || '#c62828';
                    context.fill();
                    context.fillStyle = "white";
                    context.font = "bold 44px Roboto";
                    context.fillText(scope.text, 30, 60);
                });

            }
        };
    }
})();
