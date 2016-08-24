<?php
return [
    "siteName" => "GalaStyle",
    "meta" => [
        "keywords" => 'GalaStyle, magazine',
        'description' => 'Περιοδικό Lifestyle'
    ],
    'images' => [
        'optimize' => false,
        'driver' => 'gd',
        'keepOriginals' => true,
        'dirPattern' => 'uploads',
        'filePattern' => '',
        'types' => ['images'],
        'copies' => [

        ]
    ],
    'files' => [
        'dirPattern' => 'uploads',
        'filePattern' => 'uploads',
    ],
];