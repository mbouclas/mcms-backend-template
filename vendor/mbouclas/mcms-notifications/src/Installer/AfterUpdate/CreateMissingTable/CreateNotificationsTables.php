<?php

namespace Mcms\Notifications\Installer\AfterUpdate\CreateMissingTable;

use Illuminate\Console\Command;
use Schema;

class CreateNotificationsTables
{
    public function handle(Command $command)
    {

        if ( ! Schema::hasTable('notifications')){
            $file = '2016_09_28_090035_create_notifications_table.php';
            $targetFile = database_path("migrations/{$file}");
            if ( ! \File::exists($targetFile)){
                \File::copy(__DIR__ . "/../../../../database/migrations/{$file}", $targetFile);
            }
            $command->call('migrate');
        }

        if ( ! Schema::hasTable('user_notifications')){
            $file = '2016_09_28_090331_user_notification_table.php';
            $targetFile = database_path("migrations/{$file}");
            if ( ! \File::exists($targetFile)){
                \File::copy(__DIR__ . "/../../../../database/migrations/{$file}", $targetFile);
            }
            $command->call('migrate');
        }
    }
}