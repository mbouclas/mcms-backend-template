<?php

namespace Mcms\Admin\StartUp;
use App;

/**
 * Register your dependencies Service Providers here
 * Class RegisterServiceProviders
 * @package Mcms\Admin\StartUp
 */
class RegisterServiceProviders
{
    /**
     *
     */
    public function handle()
    {

        App::register(\Intervention\Image\ImageServiceProvider::class);
    }
}