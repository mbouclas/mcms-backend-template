<?php

namespace Mcms\Admin\Http\Controllers;

use Illuminate\Routing\Controller;;

use Mcms\Core\Services\Image\ImageService;
use Illuminate\Http\Request;

use App\Http\Requests;
use MenuConnector;

class ImageController extends Controller
{
    protected $image;

    public function __construct(ImageService $imageService)
    {
        $this->image = $imageService;
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
        return $this->image->store($request->toArray());
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
        $res = $this->image->update($id, $request->toArray());
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
        $this->image->destroy($id);

        return ['success' => true];
    }

    public function sort(Request $request)
    {
        //flatten the images
        $input = $request->toArray();
        foreach ($input as $item) {
            $this->image->updateSortOrder($item);
        }


    }
    
}
