<?php

namespace Mcms\Admin\Http\Controllers;

use Illuminate\Routing\Controller;;
use Mcms\Core\Models\Menu;
use Mcms\Core\Services\Menu\MenuService;
use Illuminate\Http\Request;
use ItemConnector;

class MenuItemController extends Controller
{
    protected $menu;

    public function __construct(MenuService $menuService)
    {
        $this->menu = $menuService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        /*        return $this->menu->store([
                    'title' => 'Header menu',
                    'slug' => 'header-menu'
                ]);*/

//        $menu = Menu::find(1);
//        $parent = $this->menu->menuItemModel->find(7);

        /*        $node = $this->menu->addNode([
                    'menu_id' => $menu->id,
                    'item_id' => 6,
                    'model' => 'Mcms\Core\Models\User',
                    'slug_pattern' => '/users/%id$s/%email$s',
        //            'titleField' => [
        //                'pattern' => 'profile page for %firstName$s %lastName$s'
        //            ],
                    'titleField' => [
                        'pattern' => [
                            'en' => 'profile page for %firstName$s %lastName$s',
                            'el' => 'To profil tou xristi %firstName$s %lastName$s'
                        ]
                    ],
                    'title' => '',
                    'active' => false,
                    'sync' => true
                ], 14);*/

//        $parent->appendNode($node);
        /*        print_r($this->menu->menuItemModel->
                scoped([ 'menu_id' => 1 ])->get()->ToTree()->toArray());*/

//        event('menu.item.sync',User::find(7));
//        event('menu.item.destroy',User::find(7));

        return $this->menu->menuModel->get();


//        return (new AdminInterfaceMenuConnector(new User()))->run();
//        $connector = new AdminInterfaceMenuConnector(new User());
//        return $connector->filterItems($request);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $menu = Menu::find($request->input('menu_id'));
        $parent = $request->input('parent');
        $parentId = ( ! is_null($parent)) ? $parent['id'] : null;

        $section = $request->input('section');

        $node = $this->menu->addNode([
            'menu_id' => $menu->id,
            'item_id' => $request->input('item_id'),
            'model' => $request->input('model'),
            'slug_pattern' => $section['slug_pattern'],
            'titleField' => $section['titleField'],
            'title' => $request->input('title'),
            'link' => $request->input('link'),
            'active' => true,
            'sync' => true
        ], $parentId);
        return $node;
    }

    public function show($id)
    {

//        ItemConnector::register((new AdminInterfaceMenuConnector(new User()))->run()->toArray());
//        ItemConnector::register((new AdminInterfaceMenuConnector(new User()))->run()->toArray());
//        ItemConnector::register((new AdminInterfaceMenuConnector(new User()))->run()->toArray());

        $connectors = ItemConnector::connectors();

        $menu = $this->menu->menuWithItems($id);

        return [
            'connectors' => $connectors,
            'menu' => $menu,
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $result = $this->menu->menuItemModel->find($id)->update($request->all());

        return ['success' => $result];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->menu->destroyNode($id, true);
    }

    /**
     * Filters results using a connector
     *
     * @param Request $request
     * @return mixed
     */
    public function filter(Request $request)
    {
//        print_r(\Auth::user()->getRoles());
//        ItemConnector::register((new AdminInterfaceMenuConnector())->run()->toArray());

//        print_r(ItemConnector::connectors());
        //find the connector in the registry

        $section = ItemConnector::findConnector([
            'name' => $request->input('connector')
        ], $request->input('section'))->section;

        $filter = new $section['filterService'];

        //instantiate the filter class and call the filter method
        return $filter->{$section['filterMethod']}($request, $section);
    }

    /**
     * Rebuild the entire tree
     *
     * @param Request $request
     * @return mixed
     */
    public function rebuild(Request $request)
    {
        $menu = $request->all();

        $this->menu->menuItemModel->scoped([ 'menu_id' => $request->input('id') ])->rebuildTree($menu['items']);
        return $this->menu->menuWithItems($menu['id']);
    }
}
