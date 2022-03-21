<?php

namespace Mcms\Notifications\StartUp;



use Mcms\Notifications\Middleware\PublishPage;
use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider;

/**
 * Class RegisterMiddleware
 * @package Mcms\Notifications\StartUp
 */
class RegisterMiddleware
{

    /**
     * Register all your middleware here
     * @param ServiceProvider $serviceProvider
     * @param Router $router
     */
    public function handle(ServiceProvider $serviceProvider, Router $router)
    {
        $router->middleware('publishPage', PublishPage::class);
    }
}