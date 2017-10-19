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
    <meta property="fb:pages" content="341751595916946" />
    @if(getenv('APP_ENV') == 'production')
    <!-- Google Tag Manager -->
    <script async>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-MGNC8QN');</script>
    <!-- End Google Tag Manager -->
    @endif
    @yield('critical-css')
    <script>
        !function(a){"use strict";var b=function(b,c,d){var g,e=a.document,f=e.createElement("link");if(c)g=c;else{var h=(e.body||e.getElementsByTagName("head")[0]).childNodes;g=h[h.length-1]}var i=e.styleSheets;f.rel="stylesheet",f.href=b,f.media="only x",g.parentNode.insertBefore(f,c?g:g.nextSibling);var j=function(a){for(var b=f.href,c=i.length;c--;)if(i[c].href===b)return a();setTimeout(function(){j(a)})};return f.onloadcssdefined=j,j(function(){f.media=d||"all"}),f};"undefined"!=typeof module?module.exports=b:a.loadCSS=b}("undefined"!=typeof global?global:this);
        loadCSS('https://fonts.googleapis.com/css?family=Roboto');
        loadCSS('https://fonts.googleapis.com/icon?family=Material+Icons');
        loadCSS('{{ elixir('css/all.css') }}');
    </script>
    {{--<link rel="stylesheet" href="{{asset('css/styles.min.css')}}">--}}
    @yield('og')
</head>

<body class="dynamic-header">
@if(getenv('APP_ENV') == 'production')
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MGNC8QN"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
@endif
{{--<div class="preloader"><div class="loader"></div></div>--}}

<div class="page-box" >

    @include('partials.header')

    <main id="main" class="@yield('main-class', 'home-page')">
        <div class="container">
            @yield('content')
        </div>
    </main>
    @include('partials.footer')
</div>
@yield('script')

<script data-cfasync="true" src="{{ elixir('dist/combined.js') }}" async></script>
<script data-cfasync="true" src="{{ elixir('dist/app.min.js') }}" async></script>
</body>
</html>
