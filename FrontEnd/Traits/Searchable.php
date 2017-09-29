<?php

namespace FrontEnd\Traits;

use Illuminate\Support\Collection;

trait Searchable
{
    use \Laravel\Scout\Searchable;

    private static $visibilityFieldName = 'active';
    private static $valueIndicatingVisibility = true;


    /**
     * Make all instances of the model searchable, except for the ones that are hidden by a database condition.
     *
     * @return void
     */
    public static function makeAllSearchable()
    {
        $self = new static();

        $self->newQuery()
            ->where($self::$visibilityFieldName, $self::$valueIndicatingVisibility)
            ->orderBy($self->getKeyName())
            ->searchable();
    }

    /**
     * Make the given model instance searchable, provided it wasn't hidden by a database condition.
     *
     * @return void
     */
    public function searchable()
    {
        $self = new static();

        if($this->getAttribute($self::$visibilityFieldName) == $self::$valueIndicatingVisibility)
        {
            Collection::make([$this])->searchable();
        }
        else
        {
            $this->unsearchable();
        }
    }
}