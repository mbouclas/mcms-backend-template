(function() {
    angular.module('mcms.components')
        .directive('upload', Directive);

    Directive.$inject = ['configuration', '$timeout', '$rootScope'];
    DirectiveController.$inject = [];

    function Directive(Config, $timeout, $rootScope){

        return {
            require : ['upload', 'ngModel'],
            templateUrl: Config.templatesDir + "Components/upload.component.html",
            controller: DirectiveController,
            controllerAs : 'VM',
            scope: {
                model : '=ngModel',
                options : '=?options',
                callbacks : '=?callbacks',
                onMediaLibrarySelect : '&?onMediaLibrarySelect',
                instance : '&?instance'
            },
            restrict : 'E',
            link : function(scope, element, attrs, controllers){
                scope.options = scope.options || {};
                scope.withMediaLibrary = (typeof scope.onMediaLibrarySelect == 'function');
                if (typeof scope.options.mediaLibrary == 'undefined'){
                    scope.options.mediaLibrary = {withSelector : true};
                }



                scope.onMediaLibrarySelected = function (item) {
                    if (typeof scope.onMediaLibrarySelect == 'function'){
                        scope.onMediaLibrarySelect({item : item});
                    }
                }

                var defaults = {
                    headers : {"X-CSRF-TOKEN" : Config.CSRF},
                    url : Config.imageUploadUrl,
                    paramName : 'file',
                    maxFilesize : '10',
                    acceptedFiles : Config.fileTypes.image.acceptSelect,
                    addRemoveLinks : true,
                    params : {},
                    autoProcessQueue : true,
                    uploadMultiple : false,
                };

                $rootScope.$on('uploader.files.remove', function (e, file) {
                    try {
                        scope.dzMethods.removeFile(file);
                    } catch (e){}
                });

                var callbacks = {
                    addedfile : function(file){
                        scope.lastFile = file;
                    },
                    success : function(file, xhr){
                        $timeout(function () {
                            scope.model = xhr;
                        });

                        scope.dzMethods.removeFile(file);
                    },
                    queuecomplete : function () {
                        scope.dzMethods.removeAllFiles();
                    }
                };

                scope.dzOptions = angular.extend(defaults, scope.options);
                scope.dzOptions.params = scope.options.fields || scope.options.params;

                //Handle events for dropzone
                //Visit http://www.dropzonejs.com/#events for more events
                scope.dzCallbacks = angular.extend(callbacks, (scope.callbacks || {}));

                //Apply methods for dropzone
                //Visit http://www.dropzonejs.com/#dropzone-methods for more methods
                scope.dzMethods = {};

                $timeout(function () {
                    if (typeof scope.instance == 'function'){
                        scope.instance({instance : scope.dzMethods.getDropzone()});
                    }
                });

                scope.mode = 'file';
                scope.changeMode = function (mode) {
                    scope.mode = mode;
                };

            }
        };
    }

    function DirectiveController(){
        var vm = this;


    }
})();
