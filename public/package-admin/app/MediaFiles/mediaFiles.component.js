(function () {
    angular.module('mcms.mediaFiles')
        .directive('mediaFiles', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'core.services', 'configuration', 'AuthService',
        'mediaFileService', 'Dialog', 'LangService', 'MediaLibraryService'];

    function Directive(Config) {

        return {
            templateUrl: Config.templatesDir + "MediaFiles/mediaFiles.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['mediaFiles', 'ngModel'],
            scope: {
                options: '=?options',
                uploadConfig: '=uploadConfig',
                ngModel: '=ngModel'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true
                };

                scope.$watch('ngModel', function (val) {
                   if (!val || typeof val != 'object'){
                       return;
                   }

                    controllers[0].init(val);
                });

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);

            }
        };
    }

    function DirectiveController($scope, Helpers, Config, ACL, Media, Dialog, Lang, MLS) {
        var vm = this,
            currentModel, //tracks current model (images, floorplans etc)
            currentType,
            DZ = {};
        vm.Item = {};
        vm.Lang = Lang;
        vm.defaultLang = Lang.defaultLang();
        vm.dzInstance = function (instance) {
            DZ = instance;
        };
        vm.Callbacks = {
            addedfile : function(file){
                $scope.lastFile = file;
            },
            success : function (file, xhr) {
                if (typeof currentModel == 'undefined'){
                    currentModel = [];
                }
                // DZ.dzMethods.removeFile(file);
                currentModel.push(xhr);
            }
        };


        vm.init = function (item) {
            vm.Item = item;
            vm.ImageCategories = Media.getImageCategories();
        };

        vm.add = function (event, type, model) {
            var uploadAs = type.uploadAs || 'file';
            currentModel = model;
            if (uploadAs == 'image'){
                //set the image type to the correct one (images,floor plans...)
                $scope.uploadConfig[uploadAs].params.type = type.name;
            }
            $scope.uploadConfig[uploadAs].mediaLibrary = {withSelector : false};

            currentType = $scope.uploadConfig[uploadAs];

            Dialog.show({
                templateUrl : Config.templatesDir + 'MediaFiles/uploadDialog.component.html',
                locals : {
                    model : model,
                    UploadConfig : $scope.uploadConfig[uploadAs],
                    onUploadDone : onUploadDone,
                    Callbacks : vm.Callbacks,
                    onSelectFromMediaLibrary : vm.onSelectFromMediaLibrary
                }
            });
        };

        vm.onSelectFromMediaLibrary = function (item) {
            MLS.assign(currentType.params,item)
                .then(function (res) {
                    onUploadDone(res, res, currentModel);
                    Helpers.toast('Added!!!');
                });
        };

        vm.edit = function ($event, item) {
            $event.stopPropagation();
            Dialog.show({
                title : 'Edit',
                contents : '<edit-image ng-model="VM.Item" on-save="VM.onSave(item)"></edit-image>',
                locals : {
                    Item : item,
                    onSave : vm.onSave
                }
            });
        };

        vm.save = function (item) {
            Media.saveImage(item)
                .then(function () {
                    Helpers.toast('Saved!');
                });
        };

        vm.delete = function ($event, image, type) {
            $event.stopPropagation();

            Helpers.confirmDialog($event, {
                title : 'Are you sure?',
                text : 'This operation cannot be undone.',
                ok : 'Go ahead!',
                cancel : 'Nope, i changed my mind'
            })
                .then(function () {
                    Media.deleteImage(image.id)
                        .then(function () {
                            Helpers.toast('Saved!');
                            vm.Item[type].splice(vm.Item[type].indexOf(image), 1);
                        });
                }, function () {

                });

        };

        vm.onSort = function ($item, $partFrom, $partTo, $indexFrom, $indexTo) {
            Media.sortImages(vm.Item)
                .then(function () {
                    Helpers.toast('Saved!');
                });

        };

        function onUploadDone(file, response, model) {
            if (typeof model == 'undefined'){
                model = [];
            }

            model.push(response);
        }
    }
})();
