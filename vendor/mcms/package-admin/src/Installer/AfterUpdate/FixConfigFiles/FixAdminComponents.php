<?php

namespace Mcms\Admin\Installer\AfterUpdate\FixConfigFiles;

use Mcms\Core\Helpers\ConfigFiles;
use Illuminate\Console\Command;

class FixAdminComponents
{
    public function handle(Command $command)
    {

        $config = new ConfigFiles('admin');
        //we should compare the arrays, but for now fuck it
        $replacement = require(__DIR__ . "/../../../../config/config.php");
        $config->contents['components'] = $replacement['components'];
        $config->save();
        return true;
    }
}