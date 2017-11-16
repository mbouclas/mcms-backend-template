<?php

namespace FrontEnd\Helpers;


use Mcms\FrontEnd\Models\FormBuilder;

class AllFormsAsOptions
{
    public static function get()
    {
        $arr[] = [
            'default' => true,
            'label' => 'No form',
            'value' => null
        ];

        $forms = FormBuilder::all();
        foreach ($forms as $form) {
            $arr[] = [
                'default' => false,
                'label' => $form->title,
                'value' => $form->slug
            ];
        }
        return $arr;
    }
}