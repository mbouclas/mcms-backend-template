<?php

namespace Mcms\Admin\Http\Controllers;

use Illuminate\Routing\Controller;
use Mcms\Core\Models\User;
use Mcms\Core\Services\Menu\MenuService;
use Illuminate\Http\Request;

use App\Http\Requests;
use ItemConnector;

class MenuController extends Controller
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


        
//        return (new AdminInterfaceItemConnector(new User()))->run();
//        $connector = new AdminInterfaceItemConnector(new User());
//        return $connector->filterItems($request);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->menu->store($request->all());
    }

    public function show($id)
    {
//        ItemConnector::register((new AdminInterfaceItemConnector(new User()))->run()->toArray());

        $connectors = ItemConnector::connectors();
        
        $menu = $this->menu
            ->menuWithItems($id);

        return [
            'connectors' => $connectors,
            'menu' => $menu,
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $res = $this->menu->menuModel->find($id)->update($request->all());
        return [ 'success' => $res ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->menu->destroy($id);

        return ['success' => true];
    }
    
}
