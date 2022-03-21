<?php

namespace Mcms\Notifications\Console\Commands\InstallerActions;


use Illuminate\Console\Command;

/**
 * Class PublishAssets
 * @package Mcms\Notifications\Console\Commands\InstallerActions
 */
class PublishAssets
{
    /**
     * @param Command $command
     */
    public function handle(Command $command)
    {
        $command->call('vendor:publish', [
            '--provider' => 'Mcms\Notifications\NotificationsServiceProvider',
            '--tag' => ['public'],
        ]);

        $command->call('vendor:publish', [
            '--provider' => 'Mcms\Notifications\NotificationsServiceProvider',
            '--tag' => ['assets'],
        ]);

        $command->call('vendor:publish', [
            '--provider' => 'Mcms\Notifications\NotificationsServiceProvider',
            '--tag' => ['admin-package'],
        ]);

        $command->comment('* Assets published');
    }
}