<?php

namespace FrontEnd\Http\Controllers;


use App;
use FrontEnd\Helpers\FormToJs;
use FrontEnd\Models\MailSubscriber;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class MailRegistration extends Controller
{
    public function finishRegistration($hash)
    {
        $subscriber = MailSubscriber::where('link_hash', $hash)->firstOrFail();

        $Form = new \Mcms\FrontEnd\FormBuilder\FormBuilderService();
        $form = $Form->bySlug('subscriptionForm');

        return view('forms.registerSubscriber')
            ->with([
                'Form' => $form,
                'injectToForm' => [
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
        return response($request->all());
    }
}