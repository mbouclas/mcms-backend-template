<?php

namespace Mcms\Admin\Installer\AfterUpdate\PublishMissingMigrations;


use Mcms\Admin\Console\Commands\InstallerActions\ImportGatesToDb;
use Illuminate\Console\Command;
use Schema;

class AddGateKeeperTable
{
    public function handle(Command $command)
    {
        if ( ! Schema::hasTable('gate_keepers')){
            $file = '2016_11_14_174828_create_gate_keepers_table.php';
            $targetFile = database_path("migrations/{$file}");
            if ( ! \File::exists($targetFile)){
                \File::copy(__DIR__ . "/../../../../database/migrations/{$file}", $targetFile);
            }
            $command->call('migrate');
            //add the gate data
            (new ImportGatesToDb())->handle();
        }
    }
}