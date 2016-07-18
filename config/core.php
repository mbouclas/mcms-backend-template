<?php
return [
    "siteName" => "GalaStyle",
    "meta" => [
        "keywords" => 'GalaStyle, magazine',
        'description' => 'Περιοδικό Lifestyle'
    ],
    'images' => [
        'driver' => 'gd',
        'keepOriginals' => true,
        'dirPattern' => 'uploads',
        'filePattern' => '',
        'types' => ['images'],
        'copies' => [
            'thumb' => [
                'width' => 70,
                'height' => 70,
                'quality' => 100,
                'prefix' => 't_',
                'resizeType' => 'imageBox',
                'dir' => 'thumbs/',
            ],
            'big_thumb' => [
                'width' => 170,
                'height' => 170,
                'quality' => 100,
                'prefix' => 't1_',
                'resizeType' => 'imageBox',
                'dir' => 'big_thumbs/',
            ],
            'main' => [
                'width' => 500,
                'height' => 500,
                'quality' => 100,
                'prefix' => 't_',
                'resizeType' => 'imageBox',
                'dir' => '',
            ],
        ]
    ]
];