<?php

namespace Mcms\Admin\MediaLibrary;

use Mcms\Admin\Models\MediaLibrary as MediaLibraryModel;
use Mcms\Core\QueryFilters\Filterable;
use Mcms\Core\Services\Image\Resize;
use Mcms\Core\Traits\FixTags;
use Illuminate\Http\Request;

class MediaLibrary
{
    use Filterable, FixTags;
    public $model;

    public function __construct()
    {
        $this->model = new MediaLibraryModel();
        return $this;
    }

    public function filter($filters, array $options = [])
    {
        $results = $this->model->filter($filters);
        $results = (array_key_exists('orderBy', $options)) ? $results->orderBy($options['orderBy']) : $results->orderBy('created_at', 'asc');
        $results = $results->paginate();


        return $results;
    }

    public function store(array $item)
    {
        $Item = $this->model->create($item);
        $Item = $this->fixTags($item, $Item);

        return $Item;
    }

    public function update($id, array $item)
    {
        $Item = $this->model->find($id);
        $Item->update($item);
        $Item = $this->fixTags($item, $Item);

        return $Item;
    }

    public function destroy($id)
    {
        //need to delete the files first
        $Item = $this->model->find($id);
        \File::delete($Item->getPath());
        if ($Item->collection == 'images'){
            \File::delete($Item->getThumbPath());
        }
        $this->model->destroy($id);

        return true;
    }

    public function upload(Request $request)
    {
        $file = [];
        $mimeType = $request->file('file')->getMimeType();
        $collection_type = (preg_match('/image/', $mimeType)) ? 'images' : 'files';
        $file['disk'] = ( ! $request->has('disk')) ? 'media' : $request->input('disk');
        $file['collection_name'] = ( ! $request->has('collection_name')) ? $collection_type : $request->input('collection_name');
        $file['manipulations'] = ( ! $request->has('manipulations')) ? null : $request->input('manipulations');
        $file['custom_properties'] = ( ! $request->has('custom_properties')) ? null : $request->input('custom_properties');
        $file['order_column'] = ( ! $request->has('order_column')) ? null : $request->input('order_column');
        $file['settings'] = ( ! $request->has('settings')) ? null : $request->input('settings');
        $file['user_id'] = ( ! $request->has('user_id')) ? \Auth::user()->id : $request->input('user_id');
        $file['size'] = $request->file('file')->getSize();
        $file['file_name'] = md5(microtime()) . '.' . $request->file('file')->getClientOriginalExtension();
        $file['name'] = $request->file('file')->getClientOriginalName();


        $request->file('file')->storeAs(null,$file['file_name'], $file['disk']);
        $newFile = $this->store($file);

        if ($collection_type == 'images') {
            $resizer = new Resize();
            $image = $resizer->image->make($newFile->getPath());
            if (is_null($newFile->settings)){
                $newFile->settings = [];
            }
            $settings = $newFile->settings;
            $settings['meta'] = [
                'width' => $image->width(),
                'height' => $image->height(),
                'name' => $image->basename,
//                'exif' => $image->exif(),
            ];

            $newFile->settings = $settings;
            $newFile->save();

            $resizer->handle($newFile->getPath(), $newFile->getThumbPath(), ['width' => 150, 'height' => 150, 'resizeType' => 'fit']);
        }

        $newFile->url = $newFile->getUrl(true);
        return $newFile;
    }


}