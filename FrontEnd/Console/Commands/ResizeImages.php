<?php

namespace FrontEnd\Console\Commands;


use Config;
use Illuminate\Console\Command;
use Intervention\Image\ImageManager;
use Mcms\Core\Models\Image;
use Mcms\Pages\Models\Page;

class ResizeImages extends Command
{
    protected $signature = 'images:resize {module?*} {--quality=70} {--copy=*} {--id=}';

    protected $description = 'Resize images of a given module';

    protected $image;
    protected $modules = [
        'pages' => Page::class,
        'products' => '\Mcms\Products\Models\Product',
        'listings' => '\Mcms\Listings\Models\Listing'
    ];

    public function __construct()
    {
        parent::__construct();
        $driver = (Config::get('core.images.driver')) ?: 'imagick';
        $this->image = new ImageManager(array('driver' => $driver));
    }

    public function handle()
    {
        if ($this->argument('module')) {
            foreach ($this->argument('module') as $moduleName) {
                $module = new $this->modules[$moduleName];

                $this->thumbs($module);
                $this->images($module);
            }
        }
    }

    private function images($module) {
        if ($this->option('id')){
            $id = (int) $this->option('id');

            $imageConfigurator = new $module->imageConfigurator($id);
            $item = $module->find($id);

            foreach ($item->images as $image) {
                try {
                    $this->resize($imageConfigurator, $image->copies['originals']['url'], $module->config['images']['copies']);
                }
                catch (\Exception $e){
                    $this->error($image->copies['originals']['url'] . " " . $e->getMessage());
                }
            }
            return;
        }

        foreach (Image::where('model', get_class($module))->cursor() as $image) {
            if (is_array($image->copies) && isset($image->copies['originals'])) {
                $imageConfigurator = new $module->imageConfigurator($image->id);
                try {
                    $this->resize($imageConfigurator, $image->copies['originals']['url'], $module->config['images']['copies']);
                }
                catch (\Exception $e){
                    $this->error($image->copies['originals']['url'] . " " .$e->getMessage());
                }
            }
        }
    }

    private function thumbs($module) {
        if ($this->option('id')) {
            $id = (int) $this->option('id');

            $imageConfigurator = new $module->imageConfigurator($id);
            $image = $module->find($id);
            if (is_array($image->thumb) && isset($image->thumb['copies']['originals'])) {
                $imageConfigurator = new $module->imageConfigurator($image->id);
                try {
                    $this->resize($imageConfigurator, $image->thumb['copies']['originals']['url'], $module->config['images']['copies']);
                }
                catch (\Exception $e){
                    $this->error($e->getMessage());
                }
            }

            return;
        }

        foreach ($module->cursor() as $image){
            if (is_array($image->thumb) && isset($image->thumb['copies']['originals'])) {
                $imageConfigurator = new $module->imageConfigurator($image->id);
                try {
                    $this->resize($imageConfigurator, $image->thumb['copies']['originals']['url'], $module->config['images']['copies']);
                }
                catch (\Exception $e){
                    $this->error($e->getMessage());
                }
            }
        }
    }

    private function resize($imageConfigurator, $original, $copies) {
        foreach ($copies as $key => $copy) {
            // process specific copies only
            if (! in_array($key, $this->option('copy')) && count($this->option('copy')) > 0) {
                continue;
            }

            $outFile = $imageConfigurator->formatCopyFileName($original, $copy);

            $outFile = str_replace(['//', '/originals'], ['/', ''], $outFile);
            $outFile = public_path($outFile);
            $quality = $copy['quality'];

            $this->image->make(public_path($original))
                ->interlace(true)
                ->fit($copy['width'], $copy['height'])
                ->save($outFile, $quality);

            $jpgCommand = "convert \"{$outFile}\" -sampling-factor 4:2:0 -strip -quality $quality -interlace JPEG -colorspace RGB \"{$outFile}\"";
            shell_exec($jpgCommand);
            $this->info($outFile . " done");
        }
    }
}