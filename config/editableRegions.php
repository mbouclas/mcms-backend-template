<?php
            return [
    "frontPage" => [
        "slider" => [
            "label" => "Slider",
            "slug" => "slider",
            "type" => "generic",
            "allow" => [
                "item"
            ],
            "items" => [

            ],
            "settings" => [

            ],
            "regionSettings" => [
                "image" => [

                ]
            ]
        ],
        "hero" => [
            "label" => "Hero",
            "slug" => "hero",
            "type" => "generic",
            "allow" => [
                "item"
            ],
            "items" => [

            ],
            "settings" => [

            ],
            "options" => [
                [
                    "varName" => "limit",
                    "label" => "Number of items",
                    "type" => "text",
                    "options" => NULL,
                    "default" => 1
                ]
            ],
            "regionSettings" => [
                "image" => [

                ]
            ]
        ],
        "banners" => [
            "label" => "Sponsored Posts",
            "slug" => "banners",
            "type" => "generic",
            "allow" => [
                "item"
            ],
            "items" => [

            ],
            "settings" => [

            ],
            "regionSettings" => [
                "image" => [

                ]
            ]
        ],
        "featuredArticles" => [
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

            ],
            "regionSettings" => [
                "image" => [

                ]
            ]
        ],
        "latestIssue" => [
            "label" => "Latest Issue",
            "slug" => "latestIssue",
            "type" => "generic",
            "allow" => [
                "item"
            ],
            "items" => [

            ],
            "settings" => [

            ],
            "regionSettings" => [
                "image" => [

                ]
            ]
        ],
        "latestArticles" => [
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