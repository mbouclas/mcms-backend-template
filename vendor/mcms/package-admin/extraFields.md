# Extra Fields

### Filter some fields
```
vm.ExtraFields = ExtraFieldService
    .filter(Page.extraFields())
    .whereIn('layoutId', layout);
```