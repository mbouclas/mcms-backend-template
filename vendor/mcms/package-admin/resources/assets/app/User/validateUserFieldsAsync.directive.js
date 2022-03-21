(function () {
    angular.module('mcms.user')
        .directive('validateUserFieldsAsync', Directive);

    Directive.$inject = ['$q', 'UserService', '$timeout'];


    function Directive($q, UserService, $timeout) {

        return {
            require : 'ngModel',
            scope: {
                model: '=ngModel',
                originalModel : '=validateUserFieldsAsync'
            },
            restrict: 'A',
            link: function (scope, element, attrs, ctrl) {
                var field = attrs.name,
                    delay = 500,
                    timer = false;

                ctrl.$asyncValidators[field + 'Unique'] = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty model valid
                        return $q.when();
                    }

                    if(timer){
                        $timeout.cancel(timer)
                    }

                    var def = $q.defer();

                    timer = $timeout(function(){
                        //query the Datasource
                        UserService.validateField(field, modelValue)
                            .then(function (response) {
                                if (!response) {
                                    return def.resolve();
                                }
                                //check by id, this is in case the user wants to revert to the previous state after
                                //messing around with the field
                                if (response.id == scope.originalModel.id){
                                    return def.resolve();
                                }

                                //now we have a field that matches something in the DB, but not our original model,
                                //thus making it falsey

                                return def.reject();
                            });
                    }, delay);

                    return def.promise;
                };
            }
        };
    }


})();
