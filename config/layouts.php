<?php
return [
    [
        'label' => 'Page',
        'varName' => 'page',
        'view' => 'articles.article',
        'beforeRender' => '', //class that will be executed before render
        'settings' => [],
        'area' => ['pages.items'],
    ],
    [
        'label' => 'Mall Page',
        'varName' => 'mallPage',
        'view' => 'articles.mallPage',
        'beforeRender' => '', //class that will be executed before render
        'settings' => [
//            'route' => 'store'
        ],
        'area' => ['pages.items', 'listings.items'],
        'config' => [
            [
                'varName' => 'link',
                'label' => 'Site Link',
                'type' => 'url',
                'icon' => 'link',
                'options' => null
            ],
            [
                'varName' => 'fbLink',
                'label' => 'Facebook Link',
                'type' => 'url',
                'icon' => 'link',
                'options' => null
            ],
            [
                'varName' => 'phone',
                'label' => 'Phone number',
                'type' => 'text',
                'icon' => 'phone',
                'options' => null
            ],
            [
                'varName' => 'address',
                'label' => 'Address',
                'type' => 'textarea',
                'icon' => 'place',
                'options' => null
            ],
            [
                "varName" => "logo",
                "label" => "Client Logo",
                "type" => "image",
                "options" => NULL,
                "settings" => [
                    'showDetails' => true,
                    'showPreview' => false,
                    'resize' => true,
                    'quality' => 75,
                    'prefix' => 'logo_',
                    'resizeType' => 'fit',
                ]
            ],
        ]
    ],
    [
        'label' => 'Mall Category',
        'varName' => 'mallCategory',
        'view' => 'articles.mall',
        'beforeRender' => '', //class that will be executed before render
        'settings' => [
            'route' => 'stores'
        ],
        'area' => ['pages.categories', 'listings.categories'],
    ],
];