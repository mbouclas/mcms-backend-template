<?php

namespace Mcms\Admin\Http\Controllers;

use Config;
use Mcms\Admin\GateKeeper\GateKeeper;
use Mcms\Core\Models\Permission;
use Mcms\Core\Models\Role;
use Illuminate\Routing\Controller;
use Mcms\Admin\ViewComposers\JsViewBinder;
use Mcms\Core\Services\Lang\Contracts\LanguagesContract;
use Mcms\FrontEnd\Services\LayoutManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use ItemConnector;
use Lang;
use LaravelLocalization;
use View, ModuleRegistry, Auth;

/**
 * Class AdminController
 * @package Mcms\Admin\Http\Controllers
 */
class AdminController extends Controller
{
    /**
     * @var LanguagesContract
     */
    protected $translations;
    /**
     * @var Response
     */
    protected $response;

    protected $jsonResponse;

    /**
     * AdminController constructor.
     * @param LanguagesContract $languages
     * @param Response $response
     */
    public function __construct(LanguagesContract $translations,
                                Response $response, JsonResponse $jsonResponse)
    {
        $this->translations = $translations;
        $this->response = $response;
        $this->jsonResponse = $jsonResponse;
    }

    /**
     * @param Request $request
     */
    public function index()
    {
//        ModuleRegistry::registerModule('public/admin.package.json','packages/mcms-node-eshop');
        $files = ModuleRegistry::processRegistry();

        $user = Auth::user();

        if ($user) {
            $user->roles = $user->getRoles();
            $user->permissions = $user->getPermissions();
        }

        $layouts = (class_exists(\Mcms\FrontEnd\Services\LayoutManager::class)) ? LayoutManager::registry(null, 'configs') : [];

        $components = (Config::has('admin.components')) ? Config::get('admin.components') : [];
        $js = JsViewBinder::put([
            'user' => (!$user) ? null : $user->toArray(),
            'userModel' => (!$user) ? '' : get_class($user),
            'currentLocale' => 'en',
            'translations' => ['en' => array_dot(Lang::get('admin'))],
            'locales' => $this->translations->locales(),
            'Settings' => [
                'core' => Config::get('core'),
                'site' => [
                    'url' => url()->to('/')
                ]
            ],
            'ItemSelector' => [
                'connectors' => ItemConnector::connectors(),
            ],
            'Injectables' => $files['injectables'],
            'components' => $components,
            'CSRF' => csrf_token(),
            'Layouts' => $layouts,
            'ACL' => [
                'roles' => ($user) ? Role::with('permissions')->where('level','<=',$user->maxLevel())->get() : [],
                'permissions' => ($user) ? Permission::all() : [],
            ],
            'Gates' => GateKeeper::gates()->pluck(['gate'])
        ]);


        return View::make('admin::index')->with([
            'includeFiles' => $files,
            'JS' => $js
        ]);
    }


}
