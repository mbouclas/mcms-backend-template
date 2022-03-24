<?php

namespace FrontEnd\Helpers;


class Cloudinary
{
    public function __construct()
    {
        \Cloudinary::config(array(
            "cloud_name" => env('CLOUDINARY_CLOUD_NAME'),
            "api_key" => env('CLOUDINARY_API_KEY'),
            "api_secret" => env('CLOUDINARY_API_SECRET')
        ));
    }

    public function upload($imagePath, $options=[])
    {
        return \Cloudinary\Uploader::upload($imagePath, $options);
    }
}