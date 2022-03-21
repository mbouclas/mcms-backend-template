<?php

namespace Mcms\Admin\Console\Commands\InstallerActions;


use Illuminate\Console\Command;

class SeedDataBase
{
    public function handle(Command $command)
    {
        //add the gates. Load the defaults from the config file
        (new ImportGatesToDb())->handle();
        $command->comment('* Database seeded');
    }
}