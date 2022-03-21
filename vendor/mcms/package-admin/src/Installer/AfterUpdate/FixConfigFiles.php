<?php

namespace Mcms\Admin\Installer\AfterUpdate;


use Mcms\Admin\Installer\AfterUpdate\FixConfigFiles\FixAdminComponents;
use Mcms\Admin\Installer\AfterUpdate\FixConfigFiles\Update20161016;
use Mcms\Core\Models\UpdatesLog;
use Illuminate\Console\Command;

class FixConfigFiles
{
    public function handle(Command $command, UpdatesLog $item)
    {
        $classes = [
            Update20161016::class,
            FixAdminComponents::class,
        ];

        foreach ($classes as $class) {
            (new $class())->handle($command);
        }

        $item->result = true;
        $item->save();
        $command->comment('All done in Fixing config');
    }
}