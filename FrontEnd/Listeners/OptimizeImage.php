<?php

namespace FrontEnd\Listeners;

class OptimizeImage
{
    public function handle($image)
    {
        if ( ! isset($image['data']['path'])) {
            return;
        }
        $allowedExtensions = [
            'jpg',
            'jpeg',
            'JPG',
            'JPEG',
            'png'
        ];
        $info = pathinfo($image['data']['path']);
        if ( ! in_array($info['extension'], $allowedExtensions)){
            return;
        }

        if ( ! isset($image['copies']) || ! $image['copies'] || ! is_array($image['copies'])){
            if ( ! isset($image['data']['url'])){//seriously invalid
                return;
            }

            $this->compress(public_path($image['data']['url']), 85);
            return;
        }

        $module = new $image['model'];

        //we have copies
        foreach ($image['copies'] as $key => $copy) {
            if ($key == 'originals') {
                continue;
            }

            $this->compress(public_path($copy['url']), $module->config['images']['copies'][$key]['quality']);
        }

    }

    private function compress($image, $quality)
    {
        try {
            $jpgCommand = "convert \"{$image}\" -sampling-factor 4:2:0 -strip -quality $quality -interlace JPEG -colorspace RGB \"{$image}\"";
            shell_exec($jpgCommand);
        }
        catch (\Exception $e){

        }
    }
}