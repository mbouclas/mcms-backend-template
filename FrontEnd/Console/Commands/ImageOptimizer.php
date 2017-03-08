<?php

namespace FrontEnd\Console\Commands;


use Illuminate\Console\Command;

class ImageOptimizer extends Command
{
    protected $actions = [

    ];

    protected $signature = 'images:optimize {path?}';

    protected $description = 'Optimize all images under a path';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $path = ( ! $this->argument('path')) ? public_path('images') : $this->argument('path');

        $this->optimize($path);
    }

    private function optimize($path)
    {
        $jpgCommand = "find {$path} -type f -iregex '.*\\.\\(jpg\\|jpeg|\\JPG|\\JPEG\\)$' -exec bash -c 'jpegoptim -o --strip-all --all-progressive --max=70 \"$1\"' - {} \;";
        shell_exec($jpgCommand);
    }
}