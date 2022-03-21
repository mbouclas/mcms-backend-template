<?php

namespace Mcms\Admin\Models\Filters;


use App;

use Mcms\Admin\Models\MediaLibrary;
use Mcms\Core\QueryFilters\FilterableDate;
use Mcms\Core\QueryFilters\FilterableLimit;
use Mcms\Core\QueryFilters\FilterableOrderBy;
use Mcms\Core\QueryFilters\QueryFilters;


class MediaLibraryFilters extends QueryFilters
{
    use FilterableDate, FilterableOrderBy, FilterableLimit;
    
    /**
     * @var array
     */
    protected $filterable = [
        'id',
        'file_name',
        'tag',
        'name',
        'collection_name',
        'userId',
        'active',
        'dateStart',
        'dateEnd',
        'orderBy',
    ];

    /**
     * @example ?id=1,0
     * @param null|string $id
     * @return mixed
     */
    public function id($id = null)
    {
        if ( ! isset($id)){
            return $this->builder;
        }


        if (! is_array($id)) {
            $id = $id = explode(',',$id);
        }

        return $this->builder->whereIn('id', $id);
    }


    /**
     * @example ?active=1,0
     * @param null|string $active
     * @return mixed
     */
    public function active($active = null)
    {
        if ( ! isset($active)){
            return $this->builder;
        }

        //In case ?status=active,inactive
        if (! is_array($active)) {
            $active = $active = explode(',',$active);
        }

        return $this->builder->whereIn('active', $active);
    }

    /**
     * @example ?userId =1,10
     * @param null|string $user_id
     * @return mixed
     */
    public function userId($user_id = null)
    {
        if ( ! isset($user_id)){
            return $this->builder;
        }

        //In case ?status=user_id,inuser_id
        if (! is_array($user_id)) {
            $user_id = $user_id = explode(',',$user_id);
        }

        return $this->builder->whereIn('user_id', $user_id);
    }

    /**
     * @param null|string $file_name
     * @return $this
     */
    public function file_name($file_name = null)
    {
        if ( ! $file_name){
            return $this->builder;
        }

        return $this->builder->where("file_name", 'LIKE', "%{$file_name}%");
    }

    public function name($name = null)
    {
        if ( ! $name){
            return $this->builder;
        }

        return $this->builder->where("name", 'LIKE', "%{$name}%");
    }

    /**
     * @param null|string $collection_name
     * @return $this
     */
    public function collection_name($collection_name = null)
    {
        if ( ! $collection_name){
            return $this->builder;
        }

        return $this->builder->where("collection_name", 'LIKE', "%{$collection_name}%");
    }

    /**
     * @param null|string $tag
     * @return $this
     */
    public function tag($tag = null)
    {
        if ( ! $tag){
            return $this->builder;
        }

        if (! is_array($tag)) {
            $tag = $tag = explode(',',$tag);
        }
        $foundIds = MediaLibrary::select('id')->withAllTags($tag)->get()->pluck('id')->toArray();

        return $this->builder->whereIn('id', $foundIds);
    }


}