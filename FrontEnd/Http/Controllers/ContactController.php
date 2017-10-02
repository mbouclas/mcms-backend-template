<?php

namespace FrontEnd\Http\Controllers;


use Config;
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
        $data = $request->all();

        //need a mailer service
        $res = Mail::send('emails.contact', ['messageData' => $data], function ($m) use ($data) {
            $m->from($data['email'], $data['name']);
            $m->bcc('mbouclas@gmail.com', 'Michael Bouclas');
            $m->to(Config::get('mail.from.address'), Config::get('mail.from.name'))
                ->subject(Lang::get('emails.contactForm.subject', [
                    'siteName' => Config::get('core.siteName')
                ]));
        });


        return ['success' => true ];
    }
}
