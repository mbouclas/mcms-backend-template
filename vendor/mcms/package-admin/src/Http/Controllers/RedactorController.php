<?php

namespace Mcms\Admin\Http\Controllers;

use Illuminate\Routing\Controller;;
use Config;

/**
 * Class RedactorController
 * @package Mcms\Admin\Http\Controllers
 */
class RedactorController extends Controller
{
    public function clips()
    {
        return Config::get('redactor.clips');
  }
}
