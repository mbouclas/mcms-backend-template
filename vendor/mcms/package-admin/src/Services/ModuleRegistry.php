<?php

namespace Mcms\Admin\Services;

use Exception;
use Mcms\Admin\Exceptions\InvalidAdminPackageJson;
use Storage;
use Validator;
use Illuminate\Support\Collection;

/**
 * Class ModuleRegistry
 * @package Mcms\Admin\Services
 */
class ModuleRegistry
{
    /**
     * @var
     */
    protected $registry;


    /**
     * ModuleRegistry constructor.
     */
    public function __construct()
    {
        $this->reset();
        $this->processor = new Processor();
    }

    /**
     * @param $module
     * @param null $basePath
     * @return $this
     */
    public function registerModule($module, $basePath = null)
    {
        if (Storage::disk('local')->exists($module)){
            $contents = Storage::get($module);
            try {
                $json = json_decode($contents,true);

            } catch (Exception $e){
                throw new InvalidAdminPackageJson($e->getMessage());
            }

            $validate = Validator::make($json, [
                'name'=>'required',
                'package' => 'required',
                'modules' => 'required'
            ]);

            if ($validate->fails()){
                throw new InvalidAdminPackageJson($validate->messages());
            }

            $json['basePath'] = $basePath;//We need a default
            $this->registry->push(new Collection($json));
        }

        return $this;
    }

    /**
     * @param null $filter
     * @return mixed
     */
    public function get($filter = null){
        if ($filter){
            $key = key($filter);
            return $this->registry->where($key,$filter[$key]);
        }

        return $this->registry;
    }

    /**
     *
     */
    public function processRegistry()
    {
        return $this->processor->process($this->registry);
    }

    /**
     *
     */
    public function reset()
    {
        $this->registry = collect([]);
        return $this;
    }

    /**
     * @param mixed $registry
     * @return ModuleRegistry
     */
    public function setRegistry(Collection $registry)
    {
        $this->registry = $registry;
        return $this;
    }
}
