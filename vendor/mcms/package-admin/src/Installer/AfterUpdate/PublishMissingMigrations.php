<?php

namespace Mcms\Admin\Installer\AfterUpdate;


use Mcms\Admin\Installer\AfterUpdate\PublishMissingMigrations\AddGateKeeperTable;
use Mcms\Core\Models\UpdatesLog;
use Illuminate\Console\Command;

class PublishMissingMigrations
{
    public function handle(Command $command, UpdatesLog $item)
    {
        $classes = [
            AddGateKeeperTable::class
        ];

        foreach ($classes as $class) {
            (new $class())->handle($command);
        }
        $item->result = true;
        $item->save();
        $command->comment('All done in PublishMissingMigrations');
    }
}