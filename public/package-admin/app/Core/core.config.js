(function(){
    'use strict';

    var core = angular.module('mcms.core');
    var assetsUrl = '/assets/',
        appUrl = '/app/',
        componentsUrl = appUrl + 'Components/',
        templatesDir = '/package-admin/app/templates/';

    var config = {
        apiUrl : '/api/',
        prefixUrl : '/admin',
        templatesDir : templatesDir,
        imageUploadUrl: '/admin/api/upload/image',
        imageBasePath: assetsUrl + 'img',
        validationMessages : templatesDir + 'Components/validationMessages.html',
        appUrl : appUrl,
        componentsUrl : componentsUrl,
        VAT : 0,
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
