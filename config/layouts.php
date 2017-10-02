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
        'settings' => [],
        'area' => ['pages.items'],
        'config' => [
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
];