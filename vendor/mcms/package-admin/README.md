# Admin
This is the admin package for Mcms. It's build on Angular material but
you can go ahead and use any framework you like.


## Install

Via Composer

``` bash
$ composer require mcms/package-admin
```

## Usage
Add this service provider to config/app.php
``` Mcms\Admin\AdminServiceProvider::class, ```
and this alias for convenience
``` 'ModuleRegistry' => Mcms\Admin\Facades\ModuleRegistryFacade::class, ```

You can register a new admin module like so
``` php
ModuleRegistry::registerModule('{package-name}/admin.package.json');
print_r(ModuleRegistry::get());
```

Then you should publish your admin.package.json like so

```
    $this->publishes([
        __DIR__ . '/../config/admin.package.json' => storage_path('app/package-pages/admin.package.json'),
    ], 'admin-package');
```

And here is a sample of the admin.package.json

```
{
  "name" : "My package name",
  "package" : "package-name",
  "modules" : [
    "my.angular.module.name"
  ],
  "files" : {
    "js" : [
      "package-name/js/script-compiled.js"
    ],
    "css" : [
    ]
  }
}

```

Finally, make sure you publish all your files in the right folder in the public dir.

Get the processed registry with

``` php
$files = ModuleRegistry::processRegistry();

```

## Angular ACL
```
<div ng-if="ACL.can('create.users')">Can create users</div>
<div ng-if="ACL.level(2)">Is of level 2 and above</div>
<div ng-if="ACL.role('admin')">Is admin or above</div>

```

The role method can take multiple roles like
```
<div ng-if="ACL.role('admin|su|moderator')">Is admin</div>
```

Roles support inheritance, so if you are a Super User
with level 4, and the base requirement is an admin
with level 3, you are good to go as a Super User inherits
from admins

If however, Super User and admin are of the same level,
then inheritance does not apply anymore. Use the multiple
roles notation for when you want similar level of users
to pass the check (moderator - publisher or user - author)


- Need to move angular templates into the right public dir (use gulp in dev)
- Need to tell angular where the template public dir is

## Extending an angular module
We need to make use of the ModuleExtender service. Add a new module to the registry
like so :
```
    ModuleExtender.register('pages', ModuleExtender.newPackage({
        id : 'extendedModule',
        label : 'Extended Module',
        order : 99,
        file : Config.templatesDir + 'temp.html'
    }));
```

First argument should be the module name and second the extension. Usually,
we should have a component in that file but since you inherit from the 
template injection you could get away with something small.
 
Then in your module you gain the extended functionality by adding it to your
tabs or whatever render method like so: 
```
vm.tabs = ModuleExtender.extend('pages', vm.tabs);
```

First argument is the module name and the second your existing tabs which will
be concatenated with the additional ones and re-ordered.