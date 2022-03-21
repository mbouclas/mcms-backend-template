<?php

namespace Mcms\Admin\Console\Commands\InstallerActions;


use Illuminate\Console\Command;

class PublishDependencies
{
    public function handle(Command $command)
    {
        //Intervention
        $command->call('vendor:publish', [
            '--provider' => 'Intervention\Image\ImageServiceProviderLaravel5',
        ]);

        $command->comment("* Dependencies published");
    }
}