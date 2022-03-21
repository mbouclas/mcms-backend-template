<?php

namespace Mcms\Notifications\StartUp;

use Illuminate\Support\ServiceProvider;
use ModuleRegistry, ItemConnector;

class RegisterAdminPackage
{
    public function handle(ServiceProvider $serviceProvider)
    {
        ModuleRegistry::registerModule('mcms/notifications/admin.package.json');
    }
}