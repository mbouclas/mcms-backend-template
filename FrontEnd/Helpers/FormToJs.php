<?php

namespace FrontEnd\Helpers;


class FormToJs
{
    public static function convert($Form, $route = null, $inject = null)
    {
        $lang = \App::getLocale();
        $labels = \Lang::get('form');
        $labels['success'] = trans($Form['settings']['labelSuccess']);
        $ret = [
            'Form' => [
                'id' => $Form['slug'],
                'label' => (is_array($Form['label'])) ? $Form['label'][$lang] : $Form['label'],
                'description' => (is_array($Form['description'])) ? $Form['description'][$lang] : $Form['description'],
                'fields' => $Form['fields'],
                'postTo' => route($route ?: 'formBuilder-post'),
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