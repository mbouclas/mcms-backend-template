<?php

namespace FrontEnd\Listeners;


use FrontEnd\Helpers\Cloudinary;

class SendToCloudinary
{
    public function handle($image, $useUrl = false)
    {
        $cloudinary = new Cloudinary();

        $model = new $image['model'];

        $sizes = $model->config['images']['copies'];


        $source = ($useUrl) ? $image['copies']['originals']['url'] : $image['copies']['originals']['path'];
        $upload = $cloudinary->upload($source, [
            'folder' => env('CLOUDINARY_DEFAULT_FOLDER'),
            "tags" => [env('APP_NAME')]
        ]);

        $copies = [];

        $i = 0;
        foreach ($sizes as $key => $copy) {
            $copy_url = 'w_'.$copy['width'].',h_'.$copy['height'].',c_fit,q_auto:good/f_auto';
            $copies[$key]['url'] = str_replace('/upload','/upload/'.$copy_url, $upload['secure_url']);
            $i++;
        }

        $copies['originals']['url'] = $upload['secure_url'];
        $image['copies'] = $copies;

        return $image;
    }
}