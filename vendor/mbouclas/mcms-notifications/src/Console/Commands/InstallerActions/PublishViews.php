<?php

namespace Mcms\Notifications\Console\Commands\InstallerActions;


use Illuminate\Console\Command;

/**
 * Class PublishViews
 * @package Mcms\Notifications\Console\Commands\InstallerActions
 */
class PublishViews
{
    /**
     * @param Command $command
     */
    public function handle(Command $command)
    {
        $command->call('vendor:publish', [
            '--provider' => 'Mcms\Notifications\NotificationsServiceProvider',
            '--tag' => ['views'],
        ]);
        
        $command->comment('* Views published');
    }
}