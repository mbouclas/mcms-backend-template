<?php

namespace FrontEnd\Listeners;


use Tinify;

class TinyPng
{
    public function handle($image)
    {
        if ( ! getenv('TINIFY_APIKEY')) {
            return;
        }

        if ( ! isset($image['copies']) || ! $image['copies'] || ! is_array($image['copies'])){
            if ( ! isset($image['data']['url'])){//seriously invalid
                return;
            }

            Tinify::fromFile(public_path($image['data']['url']))->toFile(public_path($image['data']['url']));
            return;
        }

        //we have copies
        foreach ($image['copies'] as $copy) {
            Tinify::fromFile(public_path($copy['url']))->toFile(public_path($copy['url']));
        }

    }
}