<?php
return [
    'configurator' => IdeaSeven\FrontEnd\FormBuilder\BaseFormBuilderConfigurator::class,
    'schema' => [
        'default' => 'admin'
    ],
    'route' => [
        'name' => 'postForm',
        'config' => [
            'as' => 'formBuilder-post',
            'uses'=> 'IdeaSeven\FrontEnd\Http\Controllers\Admin\FormBuilderController@process'
        ],
        'middleware' => ['web'],
    ],
    'providers' => [
        \IdeaSeven\FrontEnd\FormBuilder\Providers\Mail::class,
        \IdeaSeven\FrontEnd\FormBuilder\Providers\Mailchimp::class,
        \IdeaSeven\FrontEnd\FormBuilder\Providers\DataBase::class,
    ]
];