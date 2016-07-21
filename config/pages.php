<?php

return [
    'items' => [
        'slug_pattern' => '/page/%slug$s',
        'images' => [
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
                ]
            ],
            'copies' => [
                'thumb' => [
                    'width' => 150,
                    'height' => 91,
                    'quality' => 100,
                    'prefix' => 't_',
                    'resizeType' => 'fit',
                    'dir' => 'thumbs/',
                ],
                'big_thumb' => [
                    'width' => 330,
                    'height' => 200,
                    'quality' => 100,
                    'prefix' => 't_',
                    'suffix' => '@2x',
                    'resizeType' => 'fit',
                    'dir' => 'thumbs/',
                ],
                'main' => [
                    'width' => 700,
                    'height' => 424,
                    'quality' => 100,
                    'prefix' => 'm_',
                    'resizeType' => 'fit',
                    'dir' => '/',
                ],
            ]
        ],
        'per_page' => 10
    ],
    'categories' => [
        'slug_pattern' => '/pages/%slug$s',
        'images' => [
            'keepOriginals' => true,
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
                'big_thumb' => [
                    'width' => 170,
                    'height' => 170,
                    'quality' => 100,
                    'prefix' => 't1_',
                    'resizeType' => 'fit',
                    'dir' => 'big_thumbs/',
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
    ]
];