<?php

namespace Mcms\Admin\Http\Controllers;

use Illuminate\Routing\Controller;;
use Mcms\Core\Models\Filters\UserFilters;
use Mcms\Core\Services\User\RoleService;
use Mcms\Core\Services\User\UserService;
use Illuminate\Http\Request;

use App\Http\Requests;

class RoleController extends Controller
{
    protected $role;

    public function __construct(RoleService $role)
    {
        $this->role = $role;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->role->all();
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->role->store($request->toArray());
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
        $result = $this->role->update($id, $request->toArray());
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
        $result = $this->role->destroy($id);
        return ['success' => $result];
    }
}
