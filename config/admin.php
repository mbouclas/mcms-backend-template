<?php
            return [
    "adminRoles" => [
        "admin",
        "su",
        "moderator"
    ],
    "components" => [
        [
            "type" => "text",
            "label" => "Text field",
            "params" => [
                "label" => [
                    "type" => "text",
                    "required" => TRUE,
                    "toSlug" => "varName",
                    "multilingual" => TRUE
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE
                ],
                "default" => [
                    "type" => "text"
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE
                ],
                "translatable" => [
                    "type" => "boolean",
                    "value" => FALSE
                ]
            ]
        ],
        [
            "type" => "url",
            "label" => "URL",
            "params" => [
                "label" => [
                    "type" => "text",
                    "required" => TRUE,
                    "toSlug" => "varName",
                    "multilingual" => TRUE
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE
                ],
                "default" => [
                    "type" => "text"
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE
                ]
            ]
        ],
        [
            "type" => "email",
            "label" => "email",
            "params" => [
                "label" => [
                    "type" => "text",
                    "required" => TRUE,
                    "toSlug" => "varName",
                    "multilingual" => TRUE
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE
                ]
            ]
        ],
        [
            "type" => "number",
            "label" => "Number",
            "params" => [
                "label" => [
                    "type" => "text",
                    "required" => TRUE,
                    "toSlug" => "varName",
                    "multilingual" => TRUE
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE
                ],
                "default" => [
                    "type" => "text",
                    "required" => TRUE,
                    "value" => 0
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE
                ],
                "step" => [
                    "type" => "number",
                    "required" => FALSE,
                    "value" => 1
                ],
                "min" => [
                    "type" => "number",
                    "required" => FALSE,
                    "value" => 0
                ],
                "max" => [
                    "type" => "number",
                    "required" => FALSE
                ]
            ]
        ],
        [
            "type" => "date",
            "label" => "Date",
            "params" => [
                "label" => [
                    "type" => "text",
                    "required" => TRUE,
                    "toSlug" => "varName",
                    "multilingual" => TRUE
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE
                ]
            ]
        ],
        [
            "type" => "boolean",
            "label" => "Boolean",
            "params" => [
                "label" => [
                    "type" => "text",
                    "required" => TRUE,
                    "toSlug" => "varName",
                    "multilingual" => TRUE
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE
                ]
            ]
        ],
        [
            "type" => "textarea",
            "label" => "Text area",
            "params" => [
                "label" => [
                    "type" => "text",
                    "required" => TRUE,
                    "toSlug" => "varName",
                    "multilingual" => TRUE
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE
                ],
                "default" => [
                    "type" => "text"
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE
                ],
                "translatable" => [
                    "type" => "boolean",
                    "value" => FALSE
                ]
            ]
        ],
        [
            "type" => "richtext",
            "label" => "Rich text",
            "params" => [
                "label" => [
                    "type" => "text",
                    "required" => TRUE,
                    "toSlug" => "varName",
                    "multilingual" => TRUE
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE
                ],
                "default" => [
                    "type" => "text"
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE
                ],
                "translatable" => [
                    "type" => "boolean",
                    "value" => FALSE
                ]
            ]
        ],
        [
            "type" => "select",
            "label" => "Dropdown",
            "params" => [
                "label" => [
                    "type" => "text",
                    "required" => TRUE,
                    "toSlug" => "varName",
                    "multilingual" => TRUE
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE
                ],
                "options" => [
                    "params" => [
                        "default" => [
                            "type" => "boolean",
                            "unique" => TRUE
                        ],
                        "label" => [
                            "type" => "text",
                            "required" => TRUE,
                            "multilingual" => TRUE
                        ],
                        "value" => [
                            "type" => "text",
                            "required" => TRUE
                        ]
                    ]
                ]
            ]
        ],
        [
            "type" => "selectMultiple",
            "label" => "Multiple select",
            "params" => [
                "label" => [
                    "type" => "text",
                    "required" => TRUE,
                    "toSlug" => "varName",
                    "multilingual" => TRUE
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE
                ],
                "options" => [
                    "params" => [
                        "default" => [
                            "type" => "boolean",
                            "unique" => TRUE
                        ],
                        "label" => [
                            "type" => "text",
                            "required" => TRUE,
                            "multilingual" => TRUE
                        ],
                        "value" => [
                            "type" => "text",
                            "required" => TRUE,
                            "multilingual" => TRUE
                        ]
                    ]
                ]
            ]
        ],
        [
            "type" => "file",
            "label" => "File",
            "params" => [
                "varName" => [
                    "type" => "text",
                    "required" => TRUE
                ],
                "label" => [
                    "type" => "text",
                    "required" => TRUE,
                    "toSlug" => "varName",
                    "multilingual" => TRUE
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE
                ],
                "translatable" => [
                    "type" => "boolean",
                    "value" => FALSE
                ]
            ]
        ],
        [
            "type" => "image",
            "label" => "Image",
            "params" => [
                "label" => [
                    "type" => "text",
                    "required" => TRUE,
                    "toSlug" => "varName",
                    "multilingual" => TRUE
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE
                ],
                "translatable" => [
                    "type" => "boolean",
                    "value" => FALSE
                ]
            ],
            "settings" => [
                "width" => [
                    "type" => "number",
                    "required" => FALSE
                ],
                "height" => [
                    "type" => "number",
                    "required" => FALSE
                ]
            ]
        ]
    ]
];