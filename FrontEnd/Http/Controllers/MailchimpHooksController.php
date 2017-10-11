<?php

namespace FrontEnd\Http\Controllers;


use FrontEnd\Models\MailSubscriber;
use FrontEnd\Notifications\MailChimpNewSubscriber;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Mail;
use Notification;
/**
 * https://developer.mailchimp.com/documentation/mailchimp/guides/about-webhooks/
 *
 * Class MailchimpHooksController
 * @package FrontEnd\Http\Controllers
 */
class MailchimpHooksController extends Controller
{
    public function index(Request $request)
    {
        return $this->{$request->type}($request->all());
//        return $request->all();
    }

    private function subscribe(array $mailChimpResponse)
    {
        // add user to DB. Only unique users
        $hash = str_random(28);

        try {
            MailSubscriber::create([
                'email' => $mailChimpResponse['data']['email'],
                'service' => 'mailchimp',
                'firstName' => $mailChimpResponse['data']['merges']['FNAME'],
                'lastName' => $mailChimpResponse['data']['merges']['LNAME'],
                'data' => $mailChimpResponse['data'],
                'link_hash' => $hash
            ]);
        }
        catch (\Exception $exception) {
            return null;
        }

        $mailChimpResponse['data']['hash'] = $hash;
        // send an email to user
//        return new \FrontEnd\Mail\MailChimpNewSubscriber($mailChimpResponse['data']);
        Mail::to($mailChimpResponse['data']['email'])
            ->send(new \FrontEnd\Mail\MailChimpNewSubscriber($mailChimpResponse['data']));
    }

    private function unsubscribe(array $data)
    {
        // remove from our DB
    }

    private function profile(array $data)
    {

    }

    private function upemail(array $data)
    {

    }

    private function cleaned(array $data)
    {

    }

    private function campaign(array $data)
    {

    }
}