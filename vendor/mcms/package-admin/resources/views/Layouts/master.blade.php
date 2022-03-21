<!doctype html>
<html lang="en" ng-app="mcms" ng-strict-di>
<head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="{{asset('package-admin/css/angular-material.min.css')}}"
          media="screen,projection"/>
    <link type="text/css" rel="stylesheet" href="{{asset('package-admin/css/md-data-table.min.css')}}"
          media="screen,projection"/>
    <link type="text/css" rel="stylesheet" href="{{asset('package-admin/css/redactor.css')}}"
          media="screen,projection"/>
    <link type="text/css" rel="stylesheet" href="{{asset('package-admin/css/dropzone.css')}}"
          media="screen,projection"/>
    <link type="text/css" rel="stylesheet" href="{{asset('package-admin/css/ng-dropzone.min.css')}}"
          media="screen,projection"/>
    <link type="text/css" rel="stylesheet" href="{{asset('package-admin/css/md-chips-select.min.css')}}"
          media="screen,projection"/>
    <link type="text/css" rel="stylesheet" href="{{asset('package-admin/css/custom.css')}}"
          media="screen,projection"/>
    <link type="text/css" rel="stylesheet" href="{{asset('package-admin/css/angular-ui-tree.min.css')}}"
          media="screen,projection"/>

    <title>{{Config::get('core.siteName')}} Admin</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            background-color: #eeeeee;

            font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
        }

        #MainContentContainer { background-color: #eeeeee; }
    </style>
</head>
<body layout="column">
<header-component ng-if="ACL.isLoggedIn()"></header-component>

<div class="container" layout="row" flex>

    <side-bar-nav ng-if="ACL.isLoggedIn()"></side-bar-nav>

    <md-content layout="column" flex id="MainContentContainer">
        <md-content layout="column" class="content-wrapper md-padding" flex layout-column id="main">
            <div flex>
                <div ng-view></div>
            </div>
        </md-content>


    </md-content>

</div>

@yield('css')
@yield('content')
<script>
    {!! $JS !!}
</script>

<script src="{{asset('package-admin/js/admin.components.js')}}"></script>

<script src="{{asset('package-admin/js/admin.app.js')}}"></script>
@yield('js')
<scroll-to></scroll-to>
</body>
</html>