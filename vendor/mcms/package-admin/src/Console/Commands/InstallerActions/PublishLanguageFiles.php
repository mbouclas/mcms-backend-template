<?php

namespace Mcms\Admin\Console\Commands\InstallerActions;


use Illuminate\Console\Command;

/**
 * Class PublishLanguageFiles
 * @package Mcms\Admin\Console\Commands\InstallerActions
 */
class PublishLanguageFiles
{
    /**
     * @param Command $command
     */
    public function handle(Command $command)
    {
        $command->call('vendor:publish', [
            '--provider' => 'Mcms\Admin\AdminServiceProvider',
            '--tag' => ['lang'],
        ]);
        $command->call('core:translations:import');
        $command->comment('* Language files published');
    }
}