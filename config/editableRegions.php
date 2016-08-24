<?php
        return [
    "frontPage" => [
        "slider" => [
            "label" => "Slider",
            "slug" => "slider",
            "type" => "generic",
            "items" => [],
            "settings" => [],
        ],
        "banners" => [
            "label" => "Sponsored Posts",
            "slug" => "banners",
            "type" => "generic",
            "items" => [],
            "settings" => [],
        ],
        "latestIssue" => [
            "label" => "Latest Issue",
            "slug" => "latestIssue",
            "type" => "generic",
            "items" => [],
            "settings" => [],
        ],
        "latestBlogPosts" => [
            "label" => "Latest Blog posts",
            "slug" => "latestBlogPosts",
            "type" => "class",
            "class" => \FrontEnd\EditableRegions\LatestBlogPosts::class,
            "settings" => [
                "limit" => 6
            ],
            "options" => [
                [
                    "varName" => "limit",
                    "label" => "Number of items",
                    "type" => "text",
                    "options" => NULL,
                    "default" => 6
                ],
            ]
        ],
    ],
    "page" => [

    ],
    "category" => [

    ],
    "contact" => [

    ]
];