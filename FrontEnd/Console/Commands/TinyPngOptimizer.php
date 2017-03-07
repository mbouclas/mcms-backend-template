<?php

namespace FrontEnd\Console\Commands;

use App;
use Mcms\Pages\Models\Page;
use Illuminate\Console\Command;
use Tinify;

class TinyPngOptimizer extends Command
{
    /**
     * @var array
     */
    protected $actions = [

    ];

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'images:tinypng';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Optimize site images using tiny png';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $savePath = (App::environment() == 'production') ? 'storage_path' : 'public_path';
        //get all pages
        $pages = Page::get();
        $this->comment("got {$pages->count()} items to process");
        $count = 0;
        foreach ($pages as $key => $page) {
            if (isset($page->thumb['copies'])) {
                $newThumb = $page->thumb;
                foreach ($newThumb['copies'] as $index => $copy) {
                    if (isset($copy['optimized']) && $copy['optimized']) {
                        $this->line("skipping {$copy['url']}");
                        continue;
                    }

                    $file = call_user_func($savePath, $copy['url']);

                    Tinify::fromFile($file)->toFile($file);
                    if (is_array($newThumb['copies'][$index])) {
                        $newThumb['copies'][$index]['optimized'] = true;
                    }

                    $this->line("{$file} optimized");
                    $count++;
                }
                $page->thumb = $newThumb;
                $page->save();
            }
        }

        $this->info("{$count} images optimized");
        return true;
    }


}
