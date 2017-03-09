<?php
return [
    'configurator' => Mcms\FrontEnd\FormBuilder\BaseFormBuilderConfigurator::class,
    'schema' => [
        'default' => 'admin'
    ],
    'route' => [
        'name' => 'postForm',
        'config' => [
            'as' => 'formBuilder-post',
            'uses'=> 'Mcms\FrontEnd\Http\Controllers\Admin\FormBuilderController@process'
        ],
        'middleware' => ['web'],
    ],
    'providers' => [
        \Mcms\FrontEnd\FormBuilder\Providers\Mail::class,
        \Mcms\FrontEnd\FormBuilder\Providers\Mailchimp::class,
        \Mcms\FrontEnd\FormBuilder\Providers\DataBase::class,
    ],
    'settings' => [
        [
            "varName" => 'labelSuccess',
            "default" => 'forms.onSuccess',
            "type" => "text",
            "label" => 'Label on success',
        ],
        [
            "varName" => 'template',
            "type" => "select",
            "label" => 'Form template',
            "options" => [
                [
                    "default" => TRUE,
                    "label" => "Default form template",
                    "value" => "default"
                ],
                [
                    "default" => false,
                    "label" => "Subscribe form",
                    "value" => "subscribeForm"
                ],
            ],
        ],
    ],
];