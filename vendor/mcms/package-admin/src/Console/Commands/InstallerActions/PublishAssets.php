<?php

namespace Mcms\Admin\Console\Commands\InstallerActions;


use Illuminate\Console\Command;

/**
 * Class PublishAssets
 * @package Mcms\Admin\Console\Commands\InstallerActions
 */
class PublishAssets
{
    /**
     * @param Command $command
     */
    public function handle(Command $command)
    {
        $command->call('vendor:publish', [
            '--provider' => 'Mcms\Admin\AdminServiceProvider',
            '--tag' => ['public'],
        ]);

        $command->call('vendor:publish', [
            '--provider' => 'Mcms\Admin\AdminServiceProvider',
            '--tag' => ['assets'],
        ]);

        $command->comment('* Assets published');
    }
}