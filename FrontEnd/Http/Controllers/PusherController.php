<?php

namespace FrontEnd\Http\Controllers;


use FrontEnd\Jobs\SubscribeUserToMailChimp;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;


class PusherController extends Controller
{
    public function index(Request $request)
    {
        \Log::info(json_encode($request->all()));
        return response($request->all());
    }

    public function send(Request $request)
    {
        SubscribeUserToMailChimp::dispatch();
        return geoip($ip = null)->getLocation()->toArray();
    }
}