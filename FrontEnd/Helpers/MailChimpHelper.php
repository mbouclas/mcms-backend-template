<?php

namespace FrontEnd\Helpers;


use Mcms\Mailchimp\Service\MailchimpListCollection;
use Mcms\Mailchimp\Service\MailchimpService;

class MailChimpHelper
{
    protected $list;
    public $mc;

    public function __construct()
    {
        $mailChimpCollection = MailchimpListCollection::createFromString(env('MAILCHIMP_LIST_ID'), env('MAILCHIMP_LIST_NAME'));
        try {
            $this->list = $mailChimpCollection->findByName(env('MAILCHIMP_LIST_NAME'));
        } catch (\Exception $exception) {
            return response('list not found');
        }

        $this->mc = (new MailchimpService($mailChimpCollection));

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

    public function update(array $userData)
    {
        $url = $this->getMemberUrl($this->subscriberHash($userData['email']));
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

        $res = $this->mc->mailChimp->patch($url, [
            'location' => $location,
            'merge_fields' => $mergeFields
        ]);

        return $res;
    }

    public function delete($email)
    {

    }
}