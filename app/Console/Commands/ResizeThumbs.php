<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Mcms\Core\Services\Image\Resize;
use Mcms\Pages\Models\Page;

class ResizeThumbs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fix:resizeMainImage';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'resize main images';

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
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $items = Page::get();
        $this->comment("{$items->count()} items found");

        foreach ($items as $item) {
            try {
                $this->resize($item);
            }
            catch (\Exception $e) {
                $this->error("Something went wrong with {$item->id}: \"{$e->getMessage()}\"");
            }
        }

        $this->info('all done');
        return true;
    }

    private function resize($model)
    {
        $configuration = new $model->imageConfigurator($model->id);

        $originalImage = public_path($model->thumb['copies']['originals']['url']);
        foreach ($configuration->config['copies'] as $copy){
            $target = $configuration->formatCopyFileName(str_replace('originals', '', $originalImage), $copy);
            $this->resizer->handle($originalImage, $target, $copy);
        }
        $this->info("Image {$model->id} done");
    }
}
