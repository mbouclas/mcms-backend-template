<?php
return [
    'plugins' => ['fontfamily','fontsize','fontcolor','fullscreen','elfinder', 'table',
        'video', 'imagemanager', 'filemanager', 'clips'],
    'buttons' => ['html','formatting','bold','italic','deleted',
        'unorderedlist','orderedlist','outdent','indent', 'table',
        'image', 'video', 'elfinder', 'file','link','alignment','horizontalrule'],
    'clipsJson' => '/admin/api/redactor/clips.json',
    'imageUpload' => '/admin/api/upload/image',
    'clipboardUploadUrl' => '/admin/api/upload/image',
    'clips' => [
        'Heading 1' => '<h1>as</h1>'
    ]
];