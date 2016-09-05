<?php

namespace FrontEnd\Layouts;
use Illuminate\Support\Collection;


/**
 * Convert items array to collection
 *
 * Class ProcessItems
 * @package FrontEnd\Layouts
 */
class ProcessItems
{

    /**
     * @param array $items
     */
    public function handle(array $items)
    {
        $ret =  new Collection();
        foreach ($items as $item) {
            $ret->push($item['item']);
        }

        return $ret;
    }
}