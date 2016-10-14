<?php

return [
    'items' => [
        'slug_pattern' => '/page/%slug$s',
        'previewController' => '\FrontEnd\Http\Controllers\HomeController@preview',
        'images' => [
            'savePath' => 'public_path',
            'optimize' => true,
            'keepOriginals' => true,
            'dirPattern' => 'pages/page_%id$s',
            'filePattern' => '',
            'types' => [
                [
                    'uploadAs' => 'image',
                    'name' => 'images',
                    'title' => 'Images',
                    'settings' => [
                        'default' => true
                    ]
                ],
                [
                    'name' => 'floor_plans',
                    'title' => 'Floor Plans',
                    'uploadAs' => 'image',
                    'settings' => [
                        'default' => false
                    ]
                ]
            ],
            'copies' => [
                'thumb' => [
                    'width' => 70,
                    'height' => 70,
                    'quality' => 100,
                    'prefix' => 't_',
                    'resizeType' => 'fit',
                    'dir' => 'thumbs/',
                ],
                'big_thumb' => [
                    'width' => 170,
                    'height' => 170,
                    'quality' => 100,
                    'prefix' => 't_',
                    'suffix' => '@2x',
                    'resizeType' => 'fit',
                    'dir' => 'thumbs/',
                ],
                'main' => [
                    'width' => 500,
                    'height' => 500,
                    'quality' => 100,
                    'prefix' => 'm_',
                    'resizeType' => 'fit',
                    'dir' => '/',
                ],
            ]
        ],
        'files' => [
            'dirPattern' => 'pages/page_%id$s',
            'filePattern' => '',
            'savePath' => 'public_path'
        ]
    ],
    'categories' => [
        'slug_pattern' => '/pages/%slug$s',
        'images' => [
            'keepOriginals' => true,
            'optimize' => true,
            'dirPattern' => 'pages/category_%id$s',
            'filePattern' => '',
            'types' => [
                [
                    'uploadAs' => 'image',
                    'name' => 'images',
                    'title' => 'Images',
                    'settings' => [
                        'default' => true
                    ]
                ]
            ],
            'copies' => [
                'thumb' => [
                    'width' => 70,
                    'height' => 70,
                    'quality' => 100,
                    'prefix' => 't_',
                    'resizeType' => 'fit',
                    'dir' => 'thumbs/',
                ],
                'main' => [
                    'width' => 500,
                    'height' => 500,
                    'quality' => 100,
                    'prefix' => 'm_',
                    'resizeType' => 'fit',
                    'dir' => '/',
                ],
            ]
        ]
    ],

];