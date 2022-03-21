<?php

namespace FrontEnd\Http\Controllers;

use App\Http\Controllers\Controller;

class BuilderController extends Controller
{

    public function build() {
        return ['success' => true];
    }
}