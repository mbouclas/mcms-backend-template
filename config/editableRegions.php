<?php
            return [
    "frontPage" => [
        "slider" => [
            "label" => "Slider",
            "slug" => "slider",
            "type" => "generic",
            "items" => [

            ],
            "settings" => [

            ]
        ],
        "banners" => [
            "label" => "Sponsored Posts",
            "slug" => "banners",
            "type" => "generic",
            "items" => [

            ],
            "settings" => [

            ]
        ],
        "featuredBlogPosts" => [
            "label" => "Featured Posts",
            "slug" => "featuredBlogPosts",
            "type" => "generic",
            "allow" => [
                "item"
            ],
            "maxItemsAllowed" => 5,
            "items" => [

            ],
            "settings" => [

            ]
        ],
        "latestIssue" => [
            "label" => "Latest Issue",
            "slug" => "latestIssue",
            "type" => "generic",
            "items" => [

            ],
            "settings" => [

            ]
        ],
        "latestBlogPosts" => [
            "label" => "Latest Blog posts",
            "slug" => "latestBlogPosts",
            "type" => "class",
            "class" => "FrontEnd\\EditableRegions\\LatestBlogPosts",
            "settings" => [

            ],
            "options" => [
                [
                    "varName" => "limit",
                    "label" => "Number of items",
                    "type" => "text",
                    "options" => NULL,
                    "default" => 6
                ]
            ],
            "items" => [

            ]
        ]
    ],
    "page" => [

    ],
    "category" => [

    ],
    "contact" => [

    ]
];