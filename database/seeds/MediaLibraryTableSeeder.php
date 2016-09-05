<?php

use IdeaSeven\Admin\MediaLibrary\MediaLibrary as ML;
use IdeaSeven\Admin\Models\MediaLibrary;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class MediaLibrarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ML = new ML();
        $files = [
            'img1.jpg',
            'img2.jpg',
            'img3.jpg',
            'img4.jpg',
            'img5.jpg',
            'img6.jpg',
            'img7.jpg',
            'img8.jpg',
            'img9.jpg',
            'img10.jpg',
        ];

        $tags = [
            'tech',
            'computers',
            'blue',
            'today',
            'future',
            'chip',
            'intel',
            'human',
            'people',
            'machine',
            'skynet',
            'yoda',
            'micro-processor',
            'pins',
            'cool',
            'mobo',
            'e-commerce'
        ];
        $tagCount = count($tags)-1;
        foreach (range(1, 100) as $index) {
            $tagged = [];
            $count = rand(0, $tagCount-1);

            for ($i =0; $i <= $count; $i++) {
                $tagged[] = ['name' => $tags[$i]];
            }

            $filename = $files[rand(0,9)];
            $img = [
                'collection_name' => 'images',
                'file_name' => $filename,
                'name' => "Image {$index}",
                'disk' => 'media',
                'user_id' => 2,
                'tagged' => $tagged
            ];

            $ML->store($img);
        }
    }
}
