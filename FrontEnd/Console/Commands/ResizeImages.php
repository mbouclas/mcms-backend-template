<?php

namespace FrontEnd\Console\Commands;


use Config;
use Illuminate\Console\Command;
use Intervention\Image\ImageManager;
use Mcms\Core\Models\Image;
use Mcms\Pages\Models\Page;

class ResizeImages extends Command
{
    protected $signature = 'images:resize {module?*} {--quality=70} {--copy=*}';

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
        foreach (Image::where('model', get_class($module))->cursor() as $image) {
            if (is_array($image->copies) && isset($image->copies['originals'])) {
                $imageConfigurator = new $module->imageConfigurator($image->id);
                try {
                    $this->resize($imageConfigurator, $image->copies['originals']['url'], $module->config['images']['copies']);
                }
                catch (\Exception $e){
                    $this->error($e->getMessage());
                }
            }
        }
    }

    private function thumbs($module) {
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
            $resizeType = (isset($options['resizeType'])) ? $copy['resizeType'] : 'resize';

            $this->image->make(public_path($original))
                ->interlace()
                ->{$resizeType}($copy['width'], $copy['height'])
                ->save(public_path($outFile), $this->option('quality'));

            $this->info($outFile . " done");
        }
    }
}