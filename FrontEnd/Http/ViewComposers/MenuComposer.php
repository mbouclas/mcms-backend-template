<?php

namespace FrontEnd\Http\ViewComposers;
use IdeaSeven\Core\Services\Menu\MenuService;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Collection;


class MenuComposer
{
    protected $menu;

    public function __construct(MenuService $menuService)
    {
        $this->menu = $menuService;
    }

    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $view->with('HeaderMenu', $this->tree('header-menu'));

    }


    /**
     * @param View $view
     * @param $menus
     */
    private function composerFooterMenu(View $view)
    {
        $view->with('HeaderMenu', $this->tree('footer-menu'));
    }

    private function tree($slug){

        $menu = $this->menu->menuModel->where('slug', $slug)->select('id')->first();
        if ( ! $menu){
            return new Collection();
        }

        return $this->menu
            ->menuItemModel->
            scoped(['menu_id' => $menu->id])
            ->defaultOrder()
            ->get()
            ->toTree();
    }
}