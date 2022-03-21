<?php

namespace Mcms\Admin\Http\Controllers;


use Mcms\Admin\MediaLibrary\MediaLibrary;
use Mcms\Admin\Models\Filters\MediaLibraryFilters;
use Mcms\Core\Services\Image\ImageConfiguratorContract;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class MediaLibraryController extends Controller
{
    protected $library;

    public function __construct(MediaLibrary $library)
    {
        $this->library = $library;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(MediaLibraryFilters $filters, Request $request)
    {

        /*      $a = $this->library->model->get()
                  ->withUrl()
                  ->withPath();
              print_r($a->toArray());*/
/*                \DB::listen(function($sql) {
            var_dump($sql->sql);
            var_dump($sql->bindings);
        });*/
        $paginated = $this->library->model
            ->with(['tagged'])
            ->filter($filters)
            ->paginate(\Config::get('media_library.results_per_page'));


        return response([
            'pagination' => [
                'total' => $paginated->total(),
                'per_page' => $paginated->perPage(),
                'last_page' => $paginated->lastPage(),
                'from' => $paginated->firstItem(),
                'to' => $paginated->lastItem(),
                'current_page' => $paginated->currentPage(),
            ],
            'items' => ($paginated->count() > 0) ? $paginated->withUrl(true) : []
        ]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->library->store($request->toArray());
    }

    public function show($id)
    {
        $item = $this->library->model->with('tagged')->find($id);
        $item->url = $item->getUrl();

        return $item;
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
        $this->library->update($id, $request->toArray());
        return $this->show($id);
    }

    public function upload(Request $request)
    {
        return $this->library->upload($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = $this->library->destroy($id);
        return response(['success' => $result]);
    }

    public function tags()
    {
        return $this->library->model->existingTags();
    }

    public function assign(Request $request)
    {

/*        $request = [
            'item_id' => 103,
            'configurator' => '\\Mcms\\Pages\\Services\\Page\\ImageConfigurator',
            'mediaLibraryId' => 301,
            'type' => 'thumb'
        ];*/

        $to = $request->input('to');
        $item = $request->input('item');
        $model = new $to['model']();

        $configurator = ($item['collection_name'] == 'images') ? 'imageConfigurator' : 'fileConfigurator';
        $configuration = new $model->{$configurator}($to['item_id']);
        if ( ! $configuration instanceof ImageConfiguratorContract){
            return ['error' => 'not a valid configuration passed'];
        }

        $file = \Mcms\Admin\Models\MediaLibrary::find($item['id']);
        $Image = app(\Mcms\Core\Services\Image\ImageService::class);
        $File = new \Symfony\Component\HttpFoundation\File\UploadedFile($file->getPath(), $file->file_name);

        $image = $Image
            ->configure($configuration)
            ->handleFromPath($File, $to)
            ->resize();

        if ($request['type'] != 'thumb'){
            return $image->save();
        }
    }
}