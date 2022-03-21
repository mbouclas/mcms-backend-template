<?php

namespace Mcms\Admin\Console\Commands\InstallerActions;


use Mcms\Admin\GateKeeper\GateKeeper;

class ImportGatesToDb
{
    public function handle()
    {
       $gates = [
            /* Users */
            [
                'title' => 'Latest Users Widget',
                'gate' => 'users.widget.latest',
                'level' => 98,
                'provider' => 'mcms.users'
            ],
            [
                'title' => 'User Menu',
                'gate' => 'users.menu',
                'level' => 50,
                'provider' => 'mcms.users'
            ],
            [
                'title' => 'User List',
                'gate' => 'users.menu.list',
                'level' => 50,
                'provider' => 'mcms.users'
            ],
            [
                'title' => 'User Roles',
                'gate' => 'users.menu.roles',
                'level' => 98,
                'provider' => 'mcms.users'
            ],
            [
                'title' => 'User Permissions',
                'gate' => 'users.menu.permissions',
                'level' => 98,
                'provider' => 'mcms.users'
            ],
            [
                'title' => 'User Profiles',
                'gate' => 'users.menu.profiles',
                'level' => 98,
                'provider' => 'mcms.users'
            ],
            [
                'title' => 'User Extra fields',
                'gate' => 'users.menu.extraFields',
                'level' => 98,
                'provider' => 'mcms.users'
            ],
            [
                'title' => 'Edit User',
                'gate' => 'users.edit',
                'level' => 50,
                'provider' => 'mcms.users'
            ],
            [
                'title' => 'Add User',
                'gate' => 'users.add',
                'level' => 50,
                'provider' => 'mcms.users'
            ],
            [
                'title' => 'Delete User',
                'gate' => 'users.delete',
                'level' => 50,
                'provider' => 'mcms.users'
            ],
            [
                'title' => 'Latest Users Widget',
                'gate' => 'users.widget.latest',
                'level' => 50,
                'provider' => 'mcms.users'
            ],
            /* MailLog */
            [
                'title' => 'Latest MailLog Widget',
                'gate' => 'mailLog.widget.latest',
                'level' => 98,
                'provider' => 'mcms.mailLog'
            ],
            [
                'title' => 'MailLog Menu',
                'gate' => 'mailLog.menu',
                'level' => 50,
                'provider' => 'mcms.mailLog'
            ],
            /* Locales */
            [
                'title' => 'Locales Menu',
                'gate' => 'locales.menu',
                'level' => 99,
                'provider' => 'mcms.lang'
            ],
            /* Translations */
            [
                'title' => 'Translations Menu',
                'gate' => 'translations.menu',
                'level' => 98,
                'provider' => 'mcms.lang'
            ],
            /* Menus */
            [
                'title' => 'Menus',
                'gate' => 'menu.menu',
                'level' => 50,
                'provider' => 'mcms.menu'
            ],
            /* Settings */
            [
                'title' => 'Settings Menu',
                'gate' => 'settings.menu',
                'level' => 98,
                'provider' => 'mcms.menu'
            ],
            [
                'title' => 'Settings Email',
                'gate' => 'settings.email.menu',
                'level' => 98,
                'provider' => 'mcms.menu'
            ],
            [
                'title' => 'Settings Logo',
                'gate' => 'settings.logo.menu',
                'level' => 99,
                'provider' => 'mcms.menu'
            ],
            [
                'title' => 'Settings Clips',
                'gate' => 'settings.clips.menu',
                'level' => 99,
                'provider' => 'mcms.menu'
            ],
            /* Website */
            [
                'title' => 'Website Menu',
                'gate' => 'website.menu',
                'level' => 50,
                'provider' => 'mcms.frontEnd'
            ],
            [
                'title' => 'Website 301 redirects',
                'gate' => 'website.permalinkArchive.menu',
                'level' => 50,
                'provider' => 'mcms.frontEnd.permalinkArchive'
            ],
            [
                'title' => 'Form builder',
                'gate' => 'website.formBuilder.menu',
                'level' => 50,
                'provider' => 'mcms.frontEnd.formBuilder'
            ],
            [
                'title' => 'Form Log',
                'gate' => 'website.formLog.menu',
                'level' => 50,
                'provider' => 'mcms.frontEnd.formBuilder'
            ],
            /* CMS */
            [
                'title' => 'CMS Categories',
                'gate' => 'cms.categories.menu',
                'level' => 50,
                'provider' => 'mcms.pages'
            ],
            [
                'title' => 'CMS Extra fields',
                'gate' => 'cms.extraFields.menu',
                'level' => 98,
                'provider' => 'mcms.pages'
            ],
           /* Editable regions */
           [
               'title' => 'Editable Regions Menu',
               'gate' => 'editableRegions.menu',
               'level' => 3,
               'provider' => 'mcms.frontEnd.editableRegions'
           ],
           [
               'title' => 'Editable Regions Edit',
               'gate' => 'editableRegions.edit',
               'level' => 3,
               'provider' => 'mcms.frontEnd.editableRegions'
           ],
            /* Notifications */
            /* Events */
            /* Products */
        ];

        GateKeeper::addGates($gates);

        return true;
    }
}