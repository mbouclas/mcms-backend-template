<?php

namespace Mcms\Admin\Models;

use Conner\Tagging\Taggable;
use Mcms\Core\QueryFilters\Filterable;
use Illuminate\Database\Eloquent\Model;

class MediaLibrary extends Model
{
    use Filterable, Taggable;

    protected $table = 'media_library';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'collection_name',
        'name',
        'file_name',
        'disk',
        'size',
        'manipulations',
        'custom_properties',
        'order_column',
        'user_id',
        'active',
        'settings',
    ];

    public $casts = [
        'settings' => 'array',
        'manipulations' => 'array',
        'custom_properties' => 'array',
        'active' => 'boolean',
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['created_at', 'updated_at'];

    protected $config;

    public function getNameAttribute($value)
    {
        return ucfirst($value);
    }

    public function __construct($attributes = [])
    {
        parent::__construct($attributes);
        $this->config = \Config::get('filesystems.disks');
    }

    public function getUrl($thumb = false)
    {
        $url = ($thumb) ? $this->getBaseMediaDirectory().'/thumb/' . $this->file_name : $this->getBaseMediaDirectory().'/' . $this->file_name;

        return $this->makeCompatibleForNonUnixHosts($url);
    }

    private function getBaseMediaDirectory(){
        $baseDirectory = str_replace(public_path(), '', $this->getStoragePath());

        return $baseDirectory;
    }

    protected function getStoragePath()
    {
        $diskRootPath = $this->config[$this->disk]['root'];

        return realpath($diskRootPath);
    }

    protected function makeCompatibleForNonUnixHosts($url)
    {
        if (DIRECTORY_SEPARATOR != '/') {
            $url = str_replace(DIRECTORY_SEPARATOR, '/', $url);
        }

        return $url;
    }

    public function getPath()
    {
        return $this->getStoragePath().'/' . $this->file_name;
    }

    public function getThumbPath()
    {
        return $this->getStoragePath().'/thumb/' . $this->file_name;
    }

    public function newCollection(array $models = []){
        return new MediaLibraryCollection($models);
    }
}