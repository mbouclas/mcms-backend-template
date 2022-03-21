<?php
return [
    'priorityCodes' => [
        [
            'code' => 0,
            'label' => 'Normal',
            'key' => 'normal',
            'color' => 'primary',
        ],
        [
            'code' => 1,
            'label' => 'Low',
            'key' => 'low',
            'color' => 'info',
        ],
        [
            'code' => 2,
            'label' => 'High',
            'key' => 'high',
            'color' => 'success',
            'mailable' => null
        ],
        [
            'code' => 3,
            'label' => 'Urgent',
            'key' => 'urgent',
            'color' => 'error',
            'mailable' => null
        ],

    ],
    'notificationTypes' => [
        'normal' => [
            'processor' => null,
            'label' => 'Normal',
            'active' => true,
            'description' => 'This notification will show up on the users dashboard next time they login'
        ],
        'email' => [
            'processor' => \Mcms\Notifications\Service\Processors\Email::class,
            'label' => 'e-mail',
            'active' => true,
            'description' => 'This notification will be sent as email'
        ],
        'sms' => [
            'processor' => null,
            'label' => 'SMS',
            'active' => false,
            'description' => 'This notification will be sent as an sms message'
        ],
        'slack' => [
            'processor' => null,
            'label' => 'Slack',
            'active' => false,
            'description' => 'This notification will be sent as a slack message'
        ]
    ]
];
