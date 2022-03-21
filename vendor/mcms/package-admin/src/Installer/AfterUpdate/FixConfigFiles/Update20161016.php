<?php

namespace Mcms\Admin\Installer\AfterUpdate\FixConfigFiles;

use Illuminate\Console\Command;

class Update20161016
{
    public function handle(Command $command)
    {
        $targetFile = config_path("admin.php");
        if ( ! \File::exists($targetFile)){
            \File::copy(__DIR__ . "/../../../config/config.php", $targetFile);
        }

        return true;
    }
}