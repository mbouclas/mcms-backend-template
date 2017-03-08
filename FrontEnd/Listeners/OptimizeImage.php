<?php

namespace FrontEnd\Listeners;



class OptimizeImage
{
    public function handle($image)
    {


        if ( ! isset($image['copies']) || ! $image['copies'] || ! is_array($image['copies'])){
            if ( ! isset($image['data']['url'])){//seriously invalid
                return;
            }

            $this->compress(public_path($image['data']['url']));
            return;
        }

        //we have copies
        foreach ($image['copies'] as $copy) {
            $this->compress(public_path($copy['url']));
        }

    }

    private function compress($image)
    {
        try {
            shell_exec("jpegoptim -o --strip-all --all-progressive --max=70 {$image}");//replace
        }
        catch (\Exception $e){

        }
    }
}