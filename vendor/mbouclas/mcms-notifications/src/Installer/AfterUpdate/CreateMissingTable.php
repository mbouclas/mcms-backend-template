<?php

namespace Mcms\Notifications\Installer\AfterUpdate;


use Mcms\Core\Models\UpdatesLog;
use Mcms\Notifications\Installer\AfterUpdate\CreateMissingTable\CreateNotificationsTables;
use Illuminate\Console\Command;

class CreateMissingTable
{
    public function handle(Command $command, UpdatesLog $item)
    {
        $classes = [
            CreateNotificationsTables::class
        ];

        foreach ($classes as $class) {
            (new $class())->handle($command);
        }

        $item->result = true;
        $item->save();
        $command->comment('All done in CreateMissingTable');
    }
}