<?php

namespace FrontEnd\Layouts;



use Illuminate\Support\Collection;

class Sample
{
    protected $layout;

    public function __construct(Collection $layout)
    {
        $this->layout = $layout;
    }

    public function handle()
    {

    }
}