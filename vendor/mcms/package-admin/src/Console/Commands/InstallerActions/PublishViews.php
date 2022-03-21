<?php

namespace Mcms\Admin\Console\Commands\InstallerActions;


use Illuminate\Console\Command;

/**
 * Class PublishViews
 * @package Mcms\Admin\Console\Commands\InstallerActions
 */
class PublishViews
{
    /**
     * @param Command $command
     */
    public function handle(Command $command)
    {
        $command->call('vendor:publish', [
            '--provider' => 'Mcms\Admin\AdminServiceProvider',
            '--tag' => ['views'],
        ]);
        
        $command->comment('* Views published');
    }
}