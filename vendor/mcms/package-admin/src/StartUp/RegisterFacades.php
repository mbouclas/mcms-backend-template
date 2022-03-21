<?php

namespace Mcms\Admin\StartUp;

use Mcms\Admin\Services\ModuleRegistry;
use App;
use Illuminate\Support\ServiceProvider;

/**
 * Register your Facades/aliases here
 * Class RegisterFacades
 * @package Mcms\Admin\StartUp
 */
class RegisterFacades
{
    /**
     * @param ServiceProvider $serviceProvider
     */
    public function handle(ServiceProvider $serviceProvider)
    {
        /**
         * Instantiate the module registry
         */
        App::bind('ModuleRegistry', function () {
            return new ModuleRegistry;
        });

        /**
         * Register Facades
         */
        $facades = \Illuminate\Foundation\AliasLoader::getInstance();
        $facades->alias('ModuleRegistry', \Mcms\Admin\Facades\ModuleRegistryFacade::class);
        $facades->alias('Image', \Intervention\Image\Facades\Image::class);
    }
}