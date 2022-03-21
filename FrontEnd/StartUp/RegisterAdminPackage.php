<?php

namespace FrontEnd\StartUp;
use Illuminate\Support\ServiceProvider;
use ItemConnector;
use ModuleRegistry;

class RegisterAdminPackage
{
    public function handle(ServiceProvider $serviceProvider)
    {
        ModuleRegistry::registerModule($serviceProvider->packageName . '/admin.package.json');
    }
}