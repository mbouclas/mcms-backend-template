<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Mcms\Core\Models\Image;
use Mcms\Core\Services\Image\ImageService;
use Mcms\Core\Services\Image\Resize;
use Mcms\Pages\Models\Page;

class ResizeImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fix:resizeImages {module=pages}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Resize images based on the new config provided';

    protected $modules;
    protected $resizer;
    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->resizer = new Resize();
        $this->modules = [
            'pages' => Page::class
        ];
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        //grab all images from DB
        $images = Image::get();
        $this->info("{$images->count()} images found");

        foreach ($images as $image){
            try {
                $this->resize($image);
            }
            catch (\Exception $e) {
                $this->error("Something went wrong with {$image->id}: \"{$e->getMessage()}\"");
            }
        }

        return true;
    }

    private function resize($img)
    {
        $model = new $img->model;
        $configuration = new $model->imageConfigurator($img->item_id);

        $originalImage = public_path($img->copies['originals']['url']);
        foreach ($configuration->config['copies'] as $copy){
            $target = $configuration->formatCopyFileName(str_replace('originals', '', $originalImage), $copy);
            $this->resizer->handle($originalImage, $target, $copy);
        }
        $this->info("Image {$img->id} done");
    }
}
