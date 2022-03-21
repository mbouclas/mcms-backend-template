<?php

namespace Mcms\Admin\Services;
use Illuminate\Support\Collection;
use Validator, File;

/**
 * Class Processor
 * @package Mcms\Admin\Services
 */
class Processor
{
    /**
     * @var Collection
     */
    protected $allFiles;

    /**
     * Processor constructor.
     */
    public function __construct()
    {
        $this->allFiles = new Collection([
            'scripts' => new Collection([]),
            'css' => new Collection([]),
            'injectables' => new Collection([]),
        ]);

    }

    /**
     * @param Collection $registry This is the module registry we will process.
     * @return Collection
     */
    public function process(Collection $registry)
    {
       $registry->each(function ($item, $key){
            $valid = Validator::make($item->toArray(),['files'=>'required']);
            if ($valid->fails()){
                return;
            }

           $js = $this->iterateFiles($item['files']['js'], $item);
           $css = $this->iterateFiles($item['files']['css'], $item);

           foreach ($js as $val){
               $this->allFiles['scripts']->push($val);
           }

           foreach ($css as $val){
               $this->allFiles['css']->push($val);
           }

           if (isset($item['modules']) OR !empty($item['modules'])){
               foreach ($item['modules'] as $module) {
                   $this->allFiles['injectables']->push($module);
               }
           }

       });

        return $this->allFiles;
    }

    /**
     * @param $files
     * @param $item
     * @return Collection
     */
    protected function iterateFiles($files, $item)
    {
        $found = new Collection();
        foreach ($files as $file){
            if (isset($item['basePath']) && !is_null($item['basePath'])) {
                $file = $item['basePath'] ."/". $file;
            }

            if (File::isDirectory($file)){
                $toAdd = File::allFiles($files);
                foreach ($toAdd as $fileFound){
                    $found->push($fileFound);
                }
                continue;
            }

            $found->push($file);
        }

        return $found;
    }

}