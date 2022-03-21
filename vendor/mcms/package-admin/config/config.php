<?php
return [
    'adminRoles' => ['admin', 'su', 'small-admin'],
    'adminLevel' => [98, 99],
    'components' => [
        [
            'type' => 'text',
            'label' => 'Text field',
            'params' => [
                'label' => [
                    'type' => 'text',
                    'required' => true,
                    'toSlug' => 'varName',
                    'multilingual' => true,
                    'label' => 'Label',
                ],
                'varName' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Field name (no spaces)'
                ],
                'placeholder' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Field placeholder'
                ],
                'description' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Description'
                ],
                'default' => [
                    'type' => 'text',
                    'label' => 'Default value'
                ],
                'required' => [
                    'type' => 'boolean',
                    'value' => false,
                    'label' => 'Required?'
                ],
                'translatable' => [
                    'type' => 'boolean',
                    'value' => false,
                    'label' => 'Translatable'
                ],
            ]
        ],
        [
            'type' => 'url',
            'label' => 'URL',
            'params' => [
                'label' => [
                    'type' => 'text',
                    'required' => true,
                    'toSlug' => 'varName',
                    'multilingual' => true,
                    'label' => 'Label',
                ],
                'varName' => [
                    'type' => 'text',
                    'required' => true,
                ],
                'placeholder' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Field placeholder'
                ],
                'description' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Description'
                ],
                'default' => [
                    'type' => 'text',
                    'label' => 'Default value'
                ],
                'required' => [
                    'type' => 'boolean',
                    'value' => false,
                    'label' => 'Required?'
                ],
            ]
        ],
        [
            'type' => 'email',
            'label' => 'email',
            'params' => [
                'label' => [
                    'type' => 'text',
                    'required' => true,
                    'toSlug' => 'varName',
                    'multilingual' => true,
                    'label' => 'Label',
                ],
                'varName' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Field name (no spaces)'
                ],
                'placeholder' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Field placeholder'
                ],
                'description' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Description'
                ],
                'required' => [
                    'type' => 'boolean',
                    'value' => false,
                    'label' => 'Required?'
                ],
            ]
        ],
        [
            'type' => 'number',
            'label' => 'Number',
            'params' => [
                'label' => [
                    'type' => 'text',
                    'required' => true,
                    'toSlug' => 'varName',
                    'multilingual' => true,
                    'label' => 'Label',
                ],
                'varName' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Field name (no spaces)'
                ],
                'placeholder' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Field placeholder'
                ],
                'description' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Description'
                ],
                'default' => [
                    'type' => 'text',
                    'required' => true,
                    'value' => 0,
                    'label' => 'Default value'
                ],
                'required' => [
                    'type' => 'boolean',
                    'value' => false,
                    'label' => 'Required?'
                ],
                'step' => [
                    'type' => 'number',
                    'required' => false,
                    'value' => 1,
                    'label' => 'Step by'
                ],
                'min' => [
                    'type' => 'number',
                    'required' => false,
                    'value' => 0,
                    'label' => 'Minimum value'
                ],
                'max' => [
                    'type' => 'number',
                    'required' => false,
                    'label' => 'Maximum value'
                ],
            ]
        ],
        [
            'type' => 'date',
            'label' => 'Date',
            'params' => [
                'label' => [
                    'type' => 'text',
                    'required' => true,
                    'toSlug' => 'varName',
                    'multilingual' => true,
                    'label' => 'Label',
                ],
                'varName' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Field name (no spaces)'
                ],
                'description' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Description'
                ],
                'required' => [
                    'type' => 'boolean',
                    'value' => false,
                    'label' => 'Required?'
                ],
            ]
        ],
        [
            'type' => 'boolean',
            'label' => 'Boolean',
            'params' => [
                'label' => [
                    'type' => 'text',
                    'required' => true,
                    'toSlug' => 'varName',
                    'multilingual' => true,
                    'label' => 'Label',
                ],
                'varName' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Field name (no spaces)'
                ],
                'description' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Description'
                ],
                'required' => [
                    'type' => 'boolean',
                    'value' => false,
                    'label' => 'Required?'
                ],
            ]
        ],
        [
            'type' => 'textarea',
            'label' => 'Text area',
            'params' => [
                'label' => [
                    'type' => 'text',
                    'required' => true,
                    'toSlug' => 'varName',
                    'multilingual' => true,
                    'label' => 'Label',
                ],
                'varName' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Field name (no spaces)'
                ],
                'placeholder' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Field placeholder'
                ],
                'description' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Description'
                ],
                'default' => [
                    'type' => 'text',
                    'label' => 'Default value'
                ],
                'required' => [
                    'type' => 'boolean',
                    'value' => false,
                    'label' => 'Required?'
                ],
                'translatable' => [
                    'type' => 'boolean',
                    'value' => false,
                    'label' => 'Translatable'
                ],
            ]
        ],
        [
            'type' => 'richtext',
            'label' => 'Rich text',
            'params' => [
                'label' => [
                    'type' => 'text',
                    'required' => true,
                    'toSlug' => 'varName',
                    'multilingual' => true,
                    'label' => 'Label',
                ],
                'varName' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Field name (no spaces)'
                ],
                'placeholder' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Field placeholder'
                ],
                'description' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Description'
                ],
                'default' => [
                    'type' => 'text',
                    'label' => 'Default value'
                ],
                "required" => [
                    "type" => "boolean",
                    "label" => "Required field",
                    "value" => FALSE
                ],
                'translatable' => [
                    'type' => 'boolean',
                    'value' => false
                ],
            ]
        ],
        [
            'type' => 'select',
            'label' => 'Dropdown',
            'params' => [
                'label' => [
                    'type' => 'text',
                    'required' => true,
                    'toSlug' => 'varName',
                    'multilingual' => true,
                    'label' => 'Label',
                ],
                'varName' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Field name (no spaces)'
                ],
                'placeholder' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Field placeholder'
                ],
                'description' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Description'
                ],
                'required' => [
                    'type' => 'boolean',
                    'value' => false,
                    'label' => 'Required?'
                ],
                'options' => [
                    'params' => [
                        "default" => [
                            'type' => 'boolean',
                            'unique' => true,
                            'label' => 'Default value'
                        ],
                        "label" => [
                            'type' => 'text',
                            'required' => true,
                            'multilingual' => true,
                            'label' => 'Label'
                        ],
                        "value" => [
                            'type' => 'text',
                            'required' => true,
                            'label' => 'Value'
                        ]
                    ]
                ]
            ]
        ],
        [
            'type' => 'selectMultiple',
            'label' => 'Multiple select',
            'params' => [
                'label' => [
                    'type' => 'text',
                    'required' => true,
                    'toSlug' => 'varName',
                    'multilingual' => true,
                    'label' => 'Label',
                ],
                'varName' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Field name (no spaces)'
                ],
                'placeholder' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Field placeholder'
                ],
                'description' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Description'
                ],
                'required' => [
                    'type' => 'boolean',
                    'value' => false,
                    'label' => 'Required?'
                ],
                'options' => [
                    'params' => [
                        "default" => [
                            'type' => 'boolean',
                            'unique' => true,
                            'label' => 'Default value'
                        ],
                        "label" => [
                            'type' => 'text',
                            'required' => true,
                            'multilingual' => true,
                            'label' => 'Label'
                        ],
                        "value" => [
                            'type' => 'text',
                            'required' => true,
                            'label' => 'Value'
                        ]
                    ]
                ]
            ]
        ],
        [
            'type' => 'file',
            'label' => 'File',
            'params' => [
                'varName' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Field name (no spaces)'
                ],
                'label' => [
                    'type' => 'text',
                    'required' => true,
                    'toSlug' => 'varName',
                    'multilingual' => true,
                    'label' => 'Label',
                ],
                'description' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Description'
                ],
                'required' => [
                    'type' => 'boolean',
                    'value' => false,
                    'label' => 'Required?'
                ],
                'translatable' => [
                    'type' => 'boolean',
                    'value' => false,
                    'label' => 'Translatable'
                ],
            ],
        ],
        [
            'type' => 'image',
            'label' => 'Image',
            'params' => [
                'label' => [
                    'type' => 'text',
                    'required' => true,
                    'toSlug' => 'varName',
                    'multilingual' => true,
                    'label' => 'Label',
                ],
                'varName' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Field name (no spaces)'
                ],
                'description' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Description'
                ],
                'required' => [
                    'type' => 'boolean',
                    'value' => false,
                    'label' => 'Required?'
                ],
                'translatable' => [
                    'type' => 'boolean',
                    'value' => false,
                    'label' => 'Translatable'
                ],
            ],
            'settings' => [
                'width' => [
                    'type' => 'number',
                    'required' => false,
                    'label' => 'Image width',
                ],
                'height' => [
                    'type' => 'number',
                    'required' => false,
                    'label' => 'Image height',
                ],
            ]
        ],
        [
            'type' => 'itemSelector',
            'label' => 'Item Selector',
            'params' => [
                'label' => [
                    'type' => 'text',
                    'required' => true,
                    'toSlug' => 'varName',
                    'multilingual' => true,
                    'label' => 'Label',
                ],
                'varName' => [
                    'type' => 'text',
                    'required' => true,
                    'label' => 'Field name (no spaces)'
                ],
            ],
            'config' => [
                'multiple' => [
                    'type' => 'boolean',
                    'default' => true,
                    'label' => 'Allow multiple items',
                ],
                'maxItems' => [
                    'type' => 'number',
                    'default' => null,
                    'label' => 'Max number of items',
                ],
                'minItems' => [
                    'type' => 'number',
                    'default' => null,
                    'label' => 'Min number of items',
                ],
                'hasFilters' => [
                    'type' => 'boolean',
                    'default' => true,
                    'label' => 'Allow filters'
                ],
            ],
        ],
        [
            'type' => 'map',
            'label' => 'Map',
            'params' => [
                'lat' => [
                    'label' => 'Latitude',
                    'type' => 'text',
                    'required' => true,
                ],
                'long' => [
                    'label' => 'Longitude',
                    'type' => 'text',
                    'required' => true
                ],
                'zoom' => [
                    'label' => 'Zoom level',
                    'type' => 'number',
                    'required' => true,
                ],
                'required' => [
                    'type' => 'boolean',
                    'value' => false
                ]
            ],
            'settings' => [
                'markerColor' => [
                    'label' => 'Marker Color',
                    'type' => 'text',
                    'required' => false
                ],
                'markerIcon' => [
                    'label' => 'Marker Icon',
                    'type' => 'text',
                    'required' => false
                ],
            ]
        ]
    ]
];