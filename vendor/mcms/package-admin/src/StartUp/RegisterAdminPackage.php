<?php

namespace Mcms\Admin\StartUp;
use Mcms\Core\ItemSelector\UserInterfaceMenuConnector;
use Illuminate\Support\ServiceProvider;
use ItemConnector;

class RegisterAdminPackage
{

    public function handle(ServiceProvider $serviceProvider)
    {
        try {
            ItemConnector::register((new UserInterfaceMenuConnector())->run()->toArray());
        } catch (\Exception $e){

        }
    }
}