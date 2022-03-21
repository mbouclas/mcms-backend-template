<?php

namespace Mcms\Admin\Console\Commands\InstallerActions;


use Illuminate\Console\Command;


/**
 * @example php artisan vendor:publish --provider="Mcms\Admin\AdminServiceProvider" --tag=config
 * Class PublishSettings
 * @package Mcms\Admin\Console\Commands\InstallerActions
 */
class PublishSettings
{
    /**
     * @param Command $command
     */
    public function handle(Command $command)
    {
        $command->call('vendor:publish', [
            '--provider' => 'Mcms\Admin\AdminServiceProvider',
            '--tag' => ['config'],
        ]);

        $command->comment('* Settings published');
    }
}