<?php

namespace Mcms\Admin\ViewComposers;


use Laracasts\Utilities\JavaScript\PHPToJavaScriptTransformer;
use Laracasts\Utilities\JavaScript\ViewBinder;

class JsViewBinder implements ViewBinder
{
    public $transformer;


    /**
     * Bind the JavaScript variables to the view.
     *
     * @param string $js
     */
    public function bind($js)
    {
        // TODO: Implement bind() method.
    }

    public function handle($data, $namespace = 'window'){
        $this->transformer = new PHPToJavaScriptTransformer($this, $namespace);
        return $this->transformer->put($data);
    }

    public static function put($data, $namespace = 'window'){
        return (new static)->handle($data, $namespace);
    }
}