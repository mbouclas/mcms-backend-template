<?php

return [
    'pages' =>  [
        [
            'varName' => 'subscriptionForm',
            'label' => 'Show subscription form',
            'type' => 'boolean',
        ],
    ],
    'categories' => [
        [
            'varName' => 'orderBy',
            'label' => 'Order by',
            'type' => 'select',
            'options' => [
                [
                    'default' => true,
                    'label' => 'Title',
                    'value' => 'title'
                ],
                [
                    'default' => false,
                    'label' => 'Creation date',
                    'value' => 'created_at'
                ],
                [
                    'default' => false,
                    'label' => 'Custom',
                    'value' => 'custom'
                ],
            ]
        ],
    ]
];