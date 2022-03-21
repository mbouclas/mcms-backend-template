<?php

namespace Mcms\Admin\StartUp;

use Illuminate\Contracts\Auth\Access\Gate as GateContract;

/**
 * Register Auth and policies exceptions
 * Class RegisterAuth
 * @package Mcms\Admin\StartUp
 */
class RegisterAuth
{
    public function handle(GateContract $gate)
    {
        //Globally apply an exception to any policies that have to do with the user
        $gate->before(function ($user){
//            return $user->isAdmin();
        });
    }
}