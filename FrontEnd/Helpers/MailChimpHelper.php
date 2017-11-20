<?php

namespace FrontEnd\Helpers;


use Carbon\Carbon;
use Mcms\Mailchimp\Service\MailchimpListCollection;
use Mcms\Mailchimp\Service\MailchimpService;

class MailChimpHelper
{
    protected $list;
    public $mc;
    protected $collection;

    public function __construct()
    {
        $mailChimpCollection = MailchimpListCollection::createFromString(env('MAILCHIMP_LIST_ID'), env('MAILCHIMP_LIST_NAME'));
        try {
            $this->list = $mailChimpCollection->findByName(env('MAILCHIMP_LIST_NAME'));
        } catch (\Exception $exception) {
            return response('list not found');
        }

        $this->mc = (new MailchimpService($mailChimpCollection));
        $this->collection = $mailChimpCollection;
        return $this;
    }


    public function subscriberHash($email)
    {
        return md5($email);
    }

    public function getMemberUrl($subscriberHash)
    {
        return 'lists/' . $this->list->getId() . '/members/' . $subscriberHash;
    }

    public function subscribe(array $userData)
    {
        $url = 'lists/'. $this->list->getId() . '/members';

        $data = [
            'email_address' => $userData['email'],
            'status' => 'subscribed',
            'email_type' => 'html',
            'timestamp_signup' => Carbon::now()->format('Y-m-d\TH:i:sP'),
            'ip_signup' => (isset($userData['ip'])) ? $userData['ip'] : \Request::ip(),
        ];

        try {
            $res = $this->mc->mailChimp->post($url, $data);
        }
        catch (\Exception $exception) {
            print_r($exception);
        }

        // need to run a second update as MC is not accepting all merge data during subscribe
        return $this->update($userData);
    }

    public function update(array $userData)
    {
        $url = $this->getMemberUrl($this->subscriberHash($userData['email']));
        $subscriber = null;
        try {
            $subscriber = $this->mc->mailChimp->get($url);
        }
        catch (\Exception $exception) {
        }

        if (!$subscriber) {
            return $this->subscribe($userData);
        }

        $res = $this->mc->mailChimp->patch($url, $this->setUpUserData($userData));

        return $res;
    }

    public function delete($email)
    {

    }

    private function setUpUserData($userData)
    {
        $form_name = (isset($userData['form'])) ? $userData['form'] : 'no_form_defined';
        // check if we have a full address
        $address = [
            'addr1' => (isset($userData['address'])) ? $userData['address'] : 'undefined',
            'zip' => (isset($userData['zip'])) ? $userData['zip'] : '0000',
            'country' => (isset($userData['country'])) ? $userData['country'] : 'CY',
        ];

        $mergeFields = [
            'FNAME' => $userData['firstName'],
            'LNAME' => $userData['lastName'],
            'PHONE' => $userData['phone'],
            'CONFIRMED' => $userData['confirmed'],
            'FORM_NAME' => $form_name,
            'ADDRESS' => [
                "addr1" => $address['addr1'],
                "country" => $address['country'],
                "zip" => $address['zip'],
                "city" => $userData['city']
            ],
        ];

        // get a geo from city and cache it
        $addressString = '';
        if ($address['addr1'] !== 'undefined') {$addressString .= $address['addr1'];}
        $addressString .= ' ' . $userData['city'] . ', Cyprus';
        $geo = (new GoogleMaps($addressString))->location();

        $location = [
            'latitude' => $geo->lat,
            'longitude' => $geo->lng,
            'country_code' => 'CY',
            'timezone' => 'Europe/Nicosia',
        ];

        return [
            'location' => $location,
            'merge_fields' => $mergeFields
        ];
    }
}