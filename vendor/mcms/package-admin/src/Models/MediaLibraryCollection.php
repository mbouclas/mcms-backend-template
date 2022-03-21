<?php

namespace Mcms\Admin\Models;


use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Traits\Macroable;

class MediaLibraryCollection extends Collection
{

    public function withUrl($thumb = false)
    {
        foreach ($this as $index => $item) {
            $this[$index]->url = $item->getUrl($thumb);
            $this[$index]->original = $item->getUrl();
        }

        return $this;
    }

    public function withPath($thumb = false)
    {
        foreach ($this as $index => $item) {
            $this[$index]->path = $item->getPath($thumb);
        }

        return $this;
    }
}