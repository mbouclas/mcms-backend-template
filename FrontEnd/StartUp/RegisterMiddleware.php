<?php

namespace FrontEnd\StartUp;

use FrontEnd\Http\Middleware\AstroAuthentication;
use Illuminate\Contracts\Http\Kernel;
use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider;

class RegisterMiddleware
{
    public function handle(ServiceProvider $serviceProvider, Router $router, Kernel $kernel) {
        $router->aliasMiddleware('astroAuth', AstroAuthentication::class);
    }
}