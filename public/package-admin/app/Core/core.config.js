(function(){
    'use strict';

    var core = angular.module('mcms.core');
    var assetsUrl = '/assets/',
        appUrl = '/app/',
        componentsUrl = appUrl + 'Components/',
        templatesDir = '/package-admin/app/templates/';

    var imageUploadUrl = '/admin/api/upload/image',
        fileUploadUrl = '/admin/api/upload/file',
        _csrf = window.CSRF || '';

    var config = {
        userModel : window.userModel.replace(/\\/g, '\\\\') || 'App\\User',
        CSRF : _csrf,
        defaultDateFormat : 'DD/MM/YYYY',
        apiUrl : '/api/',
        prefixUrl : '/admin',
        Settings : {},
        templatesDir : templatesDir,
        imageUploadUrl: imageUploadUrl,
        imageBasePath: assetsUrl + 'img',
        mediaLibrary : {
            imageUploadUrl : '/admin/api/mediaLibrary/upload/'
        },
        fileUploadUrl: fileUploadUrl,
        validationMessages : templatesDir + 'Components/validationMessages.html',
        appUrl : appUrl,
        componentsUrl : componentsUrl,
        redactor : {
            fileUpload: fileUploadUrl,
            // fileManagerJson: '/files/files.json',
            // imageManagerJson: '/files/files.json',
            imageResizable : true,
            cleanStyleOnEnter : false,
            paragraphize : false,
            replaceDivs : false,
            removeAttr: false,
            deniedTags:['script', 'style'],
            dragImageUpload : true,
            imageEditable : true,
            imageUploadParam : 'file',
            uploadImageFields : {
                container: 'Item',
                configurator: '\\Mcms\\Core\\Services\\Image\\BaseImageConfigurator',
                resize: false,
                type: 'thumb',
                _token : _csrf,
                expect : 'redactor'
            },
            uploadFileFields : {
                container: 'Item',
                configurator: '\\Mcms\\Core\\Services\\File\\BaseFileConfigurator',
                resize: false,
                type: 'thumb',
                _token : _csrf,
                expect : 'redactor'
            },
            imageUpload: imageUploadUrl,
            clipboardUploadUrl: imageUploadUrl,
            clipsJson : '/admin/api/redactor/clips.json',
            plugins : ['fontfamily','fontsize','fontcolor','fullscreen','elfinder', 'table',
                'video', 'imagemanager', 'filemanager', 'clips', 'mediaLibrary'],
            buttons : ['html','formatting','bold','italic','deleted',
                'unorderedlist','orderedlist','outdent','indent', 'table',
                'image', 'video', 'elfinder', 'file','link','alignment','horizontalrule'],
            observeLinks : true
        },
      fileTypes : {
        image : {
          accept : 'image/*',
          acceptSelect : 'image/jpg,image/JPG,image/jpeg,image/JPEG,image/PNG,image/png,image/gif,image/GIF'
        },
        document : {
          accept : 'application/pdf,application/doc,application/docx',
          acceptSelect : 'application/pdf,application/doc,application/docx'
        },
        file : {
          accept : 'application/*',
          acceptSelect : 'application/*'
        },
        audio : {
          accept : 'audio/*',
          acceptSelect : 'audio/*'
        }
      }
    };

    core.value('config', config);
    core.constant('configuration',config);
})();
