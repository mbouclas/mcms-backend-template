<?php

return [
    'pages' =>  [
        [
            'varName' => 'subscriptionForm',
            'label' => 'Show subscription form',
            'type' => 'select',
            'options' => [
                [
                    'default' => true,
                    'label' => 'No form',
                    'value' => null
                ],
                [
                    'default' => false,
                    'label' => 'Subscribe to newsletter',
                    'value' => 'subscribeToNewsletter'
                ],
                [
                    'default' => false,
                    'label' => 'Subscription Form',
                    'value' => 'subscriptionForm'
                ],
                [
                    'default' => false,
                    'label' => 'Subscription For Professionals',
                    'value' => 'subscriptionForProfessionalsForm'
                ],
            ]
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