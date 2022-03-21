<?php

namespace Mcms\Admin\Http\Controllers;

use Mcms\Core\Services\File\FileService;
use Illuminate\Routing\Controller;;

use Illuminate\Http\Request;

class FileController extends Controller
{
    protected $fileService;

    public function __construct(FileService $fileService)
    {
        $this->fileService= $fileService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->fileService->store($request->toArray());
    }

    public function show($id)
    {

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
        $res = $this->fileService->update($id, $request->toArray());
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
        $this->fileService->destroy($id);

        return ['success' => true];
    }

    public function sort(Request $request)
    {
        //flatten the images
         $this->fileService->updateSortOrder($request->toArray());


    }
    
}
