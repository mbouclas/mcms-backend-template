# Settings Manager

## How it works
Pass a `injectToFields` array of fields to add more at runtime, example:
```
vm.additionalFields = [
    {
        varName : 'layoutId',
        label : 'Layout',
        type : 'selectMultiple',
        options : [
                [
                    "default": TRUE,
                    "label": "Title",
                    "value": "title"
                ],
                [
                    "default": FALSE,
                    "label": "Creation date",
                    "value": "created_at"
                ],
        ]
    }
];
```
and then 
```
<settings-creator ng-model="VM.Fields"
                  options="VM.defaultOptions"
                  inject-to-fields="VM.additionalFields"
                  on-save="VM.onSave(field, allFields,  editedModel)"
                  on-delete="VM.onDelete(field, $index, allFields)"
></settings-creator>
```


## Field types & configurations
#### Text type
```
[
    'varName' => 'test',
    'label' => 'Test',
    'type' => 'text',
    "translatable" => FALSE,
    'options' => null
],
```
#### Textarea type
```
[
    'varName' => 'test',
    'label' => 'Test',
    'type' => 'textarea',
    "translatable" => FALSE,
    'options' => null
],
```
#### Rich text type
```
[
    'varName' => 'test',
    'label' => 'Test',
    'type' => 'richtext',
    "translatable" => FALSE,
    'options' => null
],
```
#### Select type
```
[
    'varName' => 'test',
    'label' => 'Test',
    'type' => 'select',
    "options" => [
        [
            "default" => TRUE,
            "label" => "Title",
            "value" => "title"
        ],
        [
            "default" => FALSE,
            "label" => "Creation date",
            "value" => "created_at"
        ],
        [
            "default" => FALSE,
            "label" => "Custom",
            "value" => "custom"
        ]
    ]
],
```
#### Select Multiple type
```
[
    'varName' => 'test',
    'label' => 'Test',
    'type' => 'selectMultiple',
    "options" => [
        [
            "default" => TRUE,
            "label" => "Title",
            "value" => "title"
        ],
        [
            "default" => FALSE,
            "label" => "Creation date",
            "value" => "created_at"
        ],
        [
            "default" => FALSE,
            "label" => "Custom",
            "value" => "custom"
        ]
    ]
],
```
#### Number type
```
[
    'varName' => 'test',
    'label' => 'Test',
    'type' => 'number',
    'options' => null
],
```
#### Url type
```
[
    'varName' => 'test',
    'label' => 'Test',
    'type' => 'url',
    'options' => null
],
```
#### Email type
```
[
    'varName' => 'test',
    'label' => 'Test',
    'type' => 'email',
    'options' => null
],
```
#### Date type
```
[
    'varName' => 'test',
    'label' => 'Test',
    'type' => 'date',
    'options' => null
],
```
#### Boolean type
```
[
    'varName' => 'test',
    'label' => 'Test',
    'type' => 'boolean',
    'options' => null
],
```
#### Image type
```
[
    'varName' => 'test',
    'label' => 'Test',
    'type' => 'image',
    "translatable" => FALSE,
    'options' => null
],
```
#### File type
```
[
    'varName' => 'test',
    'label' => 'Test',
    'type' => 'file',
    "translatable" => FALSE,
    'options' => null
],
```
#### Item Selector type
```
[
    'varName' => 'item',
    'label' => 'Item',
    'type' => 'itemSelector',
    'config' => [ //is passed directly to the itemSelector component
        'multiple' => true,//or false for single item selection
        'maxItems' => 3,//max number of items
        'minItems' => 1,//min amount of items (experimental)
        'allow' => ['Pages', 'FormBuilder'], //connectors allowed
        'deny' => ['Users'], //connectors denied
    ]
],
```
