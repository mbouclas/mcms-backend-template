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
                    "multilingual" => TRUE,
                    "label" => "Label"
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Field name (no spaces)"
                ],
                "placeholder" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Field placeholder"
                ],
                "description" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Description"
                ],
                "default" => [
                    "type" => "text",
                    "label" => "Default value"
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE,
                    "label" => "Required?"
                ],
                "translatable" => [
                    "type" => "boolean",
                    "value" => FALSE,
                    "label" => "Translatable"
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
                    "multilingual" => TRUE,
                    "label" => "Label"
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE
                ],
                "placeholder" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Field placeholder"
                ],
                "description" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Description"
                ],
                "default" => [
                    "type" => "text",
                    "label" => "Default value"
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE,
                    "label" => "Required?"
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
                    "multilingual" => TRUE,
                    "label" => "Label"
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Field name (no spaces)"
                ],
                "placeholder" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Field placeholder"
                ],
                "description" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Description"
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE,
                    "label" => "Required?"
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
                    "multilingual" => TRUE,
                    "label" => "Label"
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Field name (no spaces)"
                ],
                "placeholder" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Field placeholder"
                ],
                "description" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Description"
                ],
                "default" => [
                    "type" => "text",
                    "required" => TRUE,
                    "value" => 0,
                    "label" => "Default value"
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE,
                    "label" => "Required?"
                ],
                "step" => [
                    "type" => "number",
                    "required" => FALSE,
                    "value" => 1,
                    "label" => "Step by"
                ],
                "min" => [
                    "type" => "number",
                    "required" => FALSE,
                    "value" => 0,
                    "label" => "Minimum value"
                ],
                "max" => [
                    "type" => "number",
                    "required" => FALSE,
                    "label" => "Maximum value"
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
                    "multilingual" => TRUE,
                    "label" => "Label"
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Field name (no spaces)"
                ],
                "description" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Description"
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE,
                    "label" => "Required?"
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
                    "multilingual" => TRUE,
                    "label" => "Label"
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Field name (no spaces)"
                ],
                "description" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Description"
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE,
                    "label" => "Required?"
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
                    "multilingual" => TRUE,
                    "label" => "Label"
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Field name (no spaces)"
                ],
                "placeholder" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Field placeholder"
                ],
                "description" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Description"
                ],
                "default" => [
                    "type" => "text",
                    "label" => "Default value"
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE,
                    "label" => "Required?"
                ],
                "translatable" => [
                    "type" => "boolean",
                    "value" => FALSE,
                    "label" => "Translatable"
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
                    "multilingual" => TRUE,
                    "label" => "Label"
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Field name (no spaces)"
                ],
                "placeholder" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Field placeholder"
                ],
                "description" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Description"
                ],
                "default" => [
                    "type" => "text",
                    "label" => "Default value"
                ],
                "required" => [
                    "type" => "boolean",
                    "label" => "Required field",
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
                    "multilingual" => TRUE,
                    "label" => "Label"
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Field name (no spaces)"
                ],
                "placeholder" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Field placeholder"
                ],
                "description" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Description"
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE,
                    "label" => "Required?"
                ],
                "options" => [
                    "params" => [
                        "default" => [
                            "type" => "boolean",
                            "unique" => TRUE,
                            "label" => "Default value"
                        ],
                        "label" => [
                            "type" => "text",
                            "required" => TRUE,
                            "multilingual" => TRUE,
                            "label" => "Label"
                        ],
                        "value" => [
                            "type" => "text",
                            "required" => TRUE,
                            "label" => "Value"
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
                    "multilingual" => TRUE,
                    "label" => "Label"
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Field name (no spaces)"
                ],
                "placeholder" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Field placeholder"
                ],
                "description" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Description"
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE,
                    "label" => "Required?"
                ],
                "options" => [
                    "params" => [
                        "default" => [
                            "type" => "boolean",
                            "unique" => TRUE,
                            "label" => "Default value"
                        ],
                        "label" => [
                            "type" => "text",
                            "required" => TRUE,
                            "multilingual" => TRUE,
                            "label" => "Label"
                        ],
                        "value" => [
                            "type" => "text",
                            "required" => TRUE,
                            "label" => "Value"
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
                    "required" => TRUE,
                    "label" => "Field name (no spaces)"
                ],
                "label" => [
                    "type" => "text",
                    "required" => TRUE,
                    "toSlug" => "varName",
                    "multilingual" => TRUE,
                    "label" => "Label"
                ],
                "description" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Description"
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE,
                    "label" => "Required?"
                ],
                "translatable" => [
                    "type" => "boolean",
                    "value" => FALSE,
                    "label" => "Translatable"
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
                    "multilingual" => TRUE,
                    "label" => "Label"
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Field name (no spaces)"
                ],
                "description" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Description"
                ],
                "required" => [
                    "type" => "boolean",
                    "value" => FALSE,
                    "label" => "Required?"
                ],
                "translatable" => [
                    "type" => "boolean",
                    "value" => FALSE,
                    "label" => "Translatable"
                ]
            ],
            "settings" => [
                "width" => [
                    "type" => "number",
                    "required" => FALSE,
                    "label" => "Image width"
                ],
                "height" => [
                    "type" => "number",
                    "required" => FALSE,
                    "label" => "Image height"
                ]
            ]
        ],
        [
            "type" => "itemSelector",
            "label" => "Item Selector",
            "params" => [
                "label" => [
                    "type" => "text",
                    "required" => TRUE,
                    "toSlug" => "varName",
                    "multilingual" => TRUE,
                    "label" => "Label"
                ],
                "varName" => [
                    "type" => "text",
                    "required" => TRUE,
                    "label" => "Field name (no spaces)"
                ]
            ],
            "config" => [
                "multiple" => [
                    "type" => "boolean",
                    "default" => TRUE,
                    "label" => "Allow multiple items"
                ],
                "maxItems" => [
                    "type" => "number",
                    "default" => NULL,
                    "label" => "Max number of items"
                ],
                "minItems" => [
                    "type" => "number",
                    "default" => NULL,
                    "label" => "Min number of items"
                ],
                "hasFilters" => [
                    "type" => "boolean",
                    "default" => TRUE,
                    "label" => "Allow filters"
                ]
            ]
        ]
    ]
];