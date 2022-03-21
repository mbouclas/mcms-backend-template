(function() {
    'use strict';

    angular.module('mcms.settingsManager')
        .controller('SettingsManagerController',Controller);

    Controller.$inject = ['init','configuration', 'AuthService', 'LangService', 'SeoService',
        'SiteSettingsDataService', 'core.services', 'lodashFactory'];



    function Controller(Init, Config, ACL, Lang, SEO, DS, Helpers, lo) {
        var vm = this;

        SEO.init(Init.seoFields);
        vm.ValidationMessagesTemplate = Config.validationMessages;
        vm.Roles = ACL.roles();
        vm.Roles = ACL.roles();
        vm.Permissions = ACL.permissions();
        vm.isSu = ACL.role('su');//more efficient check
        vm.tabs = [
            {
                label : 'General',
                file : Config.templatesDir + 'SettingsManager/tab-general.html',
                active : true,
                default : true,
                alias : 'general'
            },
            {
                label : 'Email',
                file : Config.templatesDir + 'SettingsManager/tab-mail.html',
                active : false,
                alias : 'mail'
            },
            {
                label : 'HTML Editor',
                file : Config.templatesDir + 'SettingsManager/tab-redactor.html',
                active : false,
                default : false,
                alias : 'html',
                acl : 'isSu'
            },
/*            {
                label : 'Marketing',
                file : Config.templatesDir + 'SettingsManager/tab-marketing.html',
                active : false,
                default : false,
                alias : 'marketing'
            }*/
        ];

        vm.Lang = Lang;
        vm.defaultLang = Lang.defaultLang();
        vm.Locales = Lang.locales();
        vm.SEO = SEO.fields();
        vm.logo = [{
            varName : 'logo',
            label : 'Site Logo',
            type : 'image'
        }];

        vm.Settings = {
            general : {
                siteName : Init.core.siteName,
                seo : Init.core.seo,
                marketing: Init.core.marketing
            },
            images : Init.core.images,
            mail : Init.mail,
            redactor : Init.redactor
        };


        if (typeof vm.Settings.redactor.clips == 'undefined' || !lo.isArray(vm.Settings.redactor.clips)){
            vm.Settings.redactor.clips = [];
        }

        SEO.fillFields(vm.Settings.general);

        vm.newRedactorClip = function () {
            vm.Settings.redactor.clips.push({
                label : '',
                value : ''
            });
        };

        vm.save = function () {
            DS.update(vm.Settings)
                .then(function (result) {
                    Helpers.toast('success!!!');
                });
        };
    }
})();
