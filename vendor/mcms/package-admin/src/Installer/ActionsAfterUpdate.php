<?php

namespace Mcms\Admin\Installer;


use Mcms\Admin\Installer\AfterUpdate\CreateMissingTable;
use Mcms\Admin\Installer\AfterUpdate\FixConfigFiles;
use Mcms\Admin\Installer\AfterUpdate\PublishMissingConfig;
use Mcms\Admin\Installer\AfterUpdate\PublishMissingMigrations;
use Mcms\Core\Exceptions\ErrorDuringUpdateException;
use Mcms\Core\UpdatesLog\UpdatesLog;
use Illuminate\Console\Command;

class ActionsAfterUpdate
{
    protected $module;
    protected $version;

    public function __construct()
    {
        $this->module = 'package-admin';
        $this->version = 9;
    }

    public function handle(Command $command)
    {
        /*
         * publish the missing migrations
         * publish the missing config
         * create the missing table media_library
         */

        $actions = [
            'PublishMissingMigrations' => PublishMissingMigrations::class,
            'PublishMissingConfig' => PublishMissingConfig::class,
            'CreateMissingTable' => CreateMissingTable::class,
            'FixConfigFiles' => FixConfigFiles::class,
        ];

        try {
            (new UpdatesLog($command, $this->module, $actions, $this->version))->process();
        }
        catch (ErrorDuringUpdateException $e){
            $command->error('Error during updating ' . $this->module);
        }

        return true;
    }
}