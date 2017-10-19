<?php

namespace FrontEnd\Http\Controllers;

use FrontEnd\Jobs\ContestAddUser;
use FrontEnd\Jobs\ContestThankYouMail;
use FrontEnd\Jobs\FinishSubscription;
use FrontEnd\Jobs\SubscriberWelcomeMail;
use FrontEnd\Mail\SimpleMail;
use FrontEnd\Models\Contest;
use FrontEnd\Models\MailSubscriber;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Lang;
use Mail;


class MailRegistration extends Controller
{
    public function finishRegistration($hash)
    {
        $subscriber = MailSubscriber::where('link_hash', $hash)->firstOrFail();
        // invalidate this hash
        $Form = new \Mcms\FrontEnd\FormBuilder\FormBuilderService();
        $form = $Form->bySlug('subscriptionForm');

        return view('forms.registerSubscriber')
            ->with([
                'Form' => $form,
                'injectToForm' => [
                    'link_hash' => $hash,
                    'defaults' => [
                        'firstName' => $subscriber->firstName,
                        'lastName' => $subscriber->lastName,
                        'email' => $subscriber->email,
                    ]
                ]
            ]);
    }

    public function submitFinishRegistration(Request $request)
    {
        $request->merge(['ip' => \Request::ip()]);
        // dispatch job
        FinishSubscription::dispatch($request->all(), [SubscriberWelcomeMail::class]);


        return response(['success' => true]);
    }

    public function subscribeToContent(Request $request)
    {
        // lets check if this user exists
        $user = Contest::where('email', $request->email)->first();
        if ($user) {
            return response(['success' => false, 'error' => Lang::get('validation.alreadyParticipated')]);
        }

        $request->merge(['ip' => \Request::ip()]);
        FinishSubscription::dispatch($request->all(), [
            ContestThankYouMail::class,
            ContestAddUser::class,
        ]);

        return response(['success' => true]);
    }
}