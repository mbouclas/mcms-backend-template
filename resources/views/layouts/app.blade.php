<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>@yield('meta-title',Config::get('core.siteName'))</title>
    <meta name="keywords" content="@yield('meta-keywords',Config::get('core.siteName'))">
    <meta name="description" content="@yield('meta-descriptions',Config::get('core.siteName'))">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="format-detection" content="telephone=no">

    <link rel="shortcut icon" href="{{asset('img/favicon.ico')}}">
    <link rel="stylesheet" href="{{asset('css/styles.min.css')}}">
    @yield('og')
</head>

<body class="dynamic-header">
{{--<div class="preloader"><div class="loader"></div></div>--}}

<div class="page-box">
    @include('partials.header')
    <main id="main" class="@yield('main-class', 'home-page')">
        <div class="container">
            @yield('content')
        </div>
    </main>
    @include('partials.footer')
</div>
<script src="{{asset('js/scripts.min.js')}}" async></script>
</body>
</html>
