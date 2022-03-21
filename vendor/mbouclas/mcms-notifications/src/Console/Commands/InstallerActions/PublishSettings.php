<?php

namespace Mcms\Notifications\Console\Commands\InstallerActions;


use Illuminate\Console\Command;


/**
 * @example php artisan vendor:publish --provider="Mcms\Notifications\NotificationsServiceProvider" --tag=config
 * Class PublishSettings
 * @package Mcms\Notifications\Console\Commands\InstallerActions
 */
class PublishSettings
{
    /**
     * @param Command $command
     */
    public function handle(Command $command)
    {
        $command->call('vendor:publish', [
            '--provider' => 'Mcms\Notifications\NotificationsServiceProvider',
            '--tag' => ['config'],
        ]);

        $command->comment('* Settings published');
    }
}