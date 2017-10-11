<?php

namespace FrontEnd\Http\Controllers;

use FrontEnd\Jobs\FinishSubscription;
use FrontEnd\Models\MailSubscriber;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;


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
        // dispatch job
        FinishSubscription::dispatch($request->all());


        return response('ok');
    }
}