<?php

namespace FrontEnd\Http\ViewComposers;


use IdeaSeven\Pages\Models\PageCategory;
use Illuminate\Contracts\View\View;

class Categories
{
    protected $categories;

    public function __construct(PageCategory $category)
    {
        $this->categories = $category;
    }

    public function compose(View $view)
    {
        $view->with('Categories', $this->categories->all()->toTree());

    }
}