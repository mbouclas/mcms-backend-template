<?php

namespace FrontEnd\Helpers;


use Cache;
use GuzzleHttp\Client;

class GoogleMaps
{
    public $url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    protected $geocode;

    public function __construct($address)
    {
        $this->query($address);
    }

    public function query($address)
    {
        if ($loc = Cache::get(md5($address))) {
            return $this->processResult(\GuzzleHttp\json_decode($loc));
        }

        $client = new Client();
        $response = $client->get($this->url . $address . '&key='. env('GOOGLE_MAPS_API_KEY'));
        $json = \GuzzleHttp\json_decode((string) $response->getBody());
        if ($json->status == 'OK') {
            Cache::forever(md5($address), (string) $response->getBody());
        }

        $this->processResult($json);

        return $this;
    }


    protected function processResult($json)
    {
        $this->geocode = $json->results[0];

        return $this;
    }

    public function location()
    {
        return $this->geocode->geometry->location;
    }

    public function viewport()
    {
        return $this->geocode->geometry->viewport;
    }

    public function geometry()
    {
        return $this->geocode->geometry;
    }

    public function formattedAddress()
    {
        return $this->geocode->formatted_address;
    }

    public function addressComponents()
    {
        return $this->geocode->address_components;
    }
}