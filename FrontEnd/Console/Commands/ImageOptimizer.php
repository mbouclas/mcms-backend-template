<?php

namespace FrontEnd\Console\Commands;


use Config;
use File;
use Illuminate\Console\Command;
use Intervention\Image\ImageManager;

class ImageOptimizer extends Command
{
    protected $actions = [

    ];

    protected $signature = 'images:optimize {path?} {--quality=70}';

    protected $description = 'Optimize all images under a path';
    protected $image;

    public function __construct()
    {
        parent::__construct();
        $driver = (Config::get('core.images.driver')) ?: 'imagick';
        $this->image = new ImageManager(array('driver' => $driver));
    }

    public function handle()
    {
        $path = ( ! $this->argument('path')) ? public_path('images') : $this->argument('path');

        $this->process($path);
//        $this->optimize($path);
    }

    private function process(string $path) {
        $allowedExtensions = [
            'jpg', 'JPG', 'png', 'jpeg'
        ];

        $files = File::allFiles($path);
//        $this->resample($files[199]);

        $i = 1;
        foreach ($files as $file)
        {
            $ext = pathinfo($file, PATHINFO_EXTENSION);
            if (!in_array(strtolower($ext), $allowedExtensions)) {
                continue;
            }

            if (strpos($file, 'originals') !== false) {
                continue;
            }
            try {
                $this->resample($file);
            }
            catch (\Exception $exception) {
                $this->error("$file error ". $exception->getMessage());
            }

            $this->comment("$i : $file.");
            $i++;
        }

        $this->info("$i files resampled");
    }

    private function resample($img) {
        $this->image->make($img)->save($img, $this->option('quality'));
    }

    private function optimize($path)
    {
        $jpgCommand = "find {$path} -type f -iregex '.*\\.\\(jpg\\|jpeg|\\JPG|\\JPEG\\)$' -exec bash -c 'jpegoptim -o --strip-all --all-progressive --max=70 \"$1\"' - {} \;";
        shell_exec($jpgCommand);
    }

    /**
     * Format bytes to kb, mb, gb, tb
     *
     * @param  integer $size
     * @param  integer $precision
     * @return integer
     */
    private function formatBytes($size, $precision = 2)
    {
        if ($size > 0) {
            $size = (int) $size;
            $base = log($size) / log(1024);
            $suffixes = array(' bytes', ' KB', ' MB', ' GB', ' TB');

            return round(pow(1024, $base - floor($base)), $precision) . $suffixes[floor($base)];
        } else {
            return $size;
        }
    }
}