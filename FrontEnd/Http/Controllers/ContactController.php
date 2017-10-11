<?php

namespace FrontEnd\Http\Controllers;


use Config;
use FrontEnd\Mail\SimpleMail;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Lang;
use Mail;

class ContactController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('contact');
    }

    public function post(Request $request)
    {

        //validate and send mail
        Mail::to(Config::get('mail.from.address'), Config::get('mail.from.name'))
            ->bcc('mbouclas@gmail.com', 'Michael Bouclas')
            ->queue(new SimpleMail($request->all(), Lang::get('emails.contactForm.subject', [
                'siteName' => Config::get('core.siteName')
            ])));


        return ['success' => true ];
    }
}
