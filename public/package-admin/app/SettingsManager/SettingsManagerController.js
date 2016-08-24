(function() {
    'use strict';

    angular.module('mcms.settingsManager')
        .controller('SettingsManagerController',Controller);

    Controller.$inject = ['init','configuration', 'AuthService', 'LangService', 'SeoService',
        'SettingsManagerDataService', 'core.services'];



    function Controller(Init, Config, ACL, Lang, SEO, DS, Helpers) {
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
                label : 'Mail',
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
            }
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
                seo : Init.core.meta
            },
            images : Init.core.images,
            mail : Init.mail,
            redactor : Init.redactor
        };

console.log(vm.Settings.redactor)
        SEO.fillFields(vm.Settings.general);

        vm.save = function () {
            DS.update(vm.Settings)
                .then(function (result) {
                    Helpers.toast('success!!!');
                });
        };
    }
})();
