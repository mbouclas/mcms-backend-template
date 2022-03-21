<?php

namespace Mcms\Admin\Facades;
use Illuminate\Support\Facades\Facade;

class ModuleRegistryFacade extends Facade
{
    /**
     * Get the binding in the IoC container
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'ModuleRegistry'; // the IoC binding.
    }
}