<?php

namespace FrontEnd\Helpers;


class FormToJs
{
    public static function convert($Form, $inject = null)
    {
        $lang = \App::getLocale();
        $labels = \Lang::get('form');
        $labels['success'] = trans($Form['settings']['labelSuccess']);
        $ret = [
            'Form' => [
                'id' => $Form['slug'],
                'label' => $Form['label'][$lang],
                'description' => $Form['description'][$lang],
                'fields' => $Form['fields'],
                'postTo' => route('formBuilder-post'),
                'CSRF' => csrf_token(),
                'inject' => $inject
            ],
            'translations' => [
                'validations' => \Lang::get('validation'),
                'labels' => $labels
            ],
            'locale' => $lang,
        ];

        return $ret;
    }
}