<?php

namespace Mcms\Admin\Http\Controllers;

use Illuminate\Routing\Controller;;
use Mcms\Core\Services\User\PermissionService;
use Illuminate\Http\Request;

use App\Http\Requests;

class PermissionController extends Controller
{
    protected $permission;

    public function __construct(PermissionService $permission)
    {
        $this->permission = $permission;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->permission->all();
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->permission->store($request->toArray());
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
        $result = $this->permission->update($id, $request->toArray());
        return ['success' => $result];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = $this->permission->destroy($id);
        return ['success' => $result];
    }
}
