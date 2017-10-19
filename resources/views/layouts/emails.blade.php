<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
@include('partials.emails.head')
<body width="100%"  style="background:#f9f9f9; margin: 0; mso-line-height-rule: exactly;">
<center style="width: 100%; background: #ffffff; text-align: left;">
    <!-- Visually Hidden Preheader Text : BEGIN -->
    <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">@yield('preheader')</div>
    <!-- Visually Hidden Preheader Text : END -->

    <!-- Email Header : BEGIN -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin: auto;" class="email-container">
        <tr>
            <td style="padding: 20px 0; text-align: center">
                <a href="{{ url('/') }}">
                <img src="{{asset('img/logo.png')}}"  alt="GalaStyle logo" border="0" style="height: auto; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                </a>
            </td>
        </tr>
    </table>
    <!-- Email Header : END -->

    <!-- Email Body : BEGIN -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin: auto;" class="email-container">
        @yield('content')
    </table>
    <!-- Email Body : END -->

    <!-- Email Footer : BEGIN -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin: auto; font-family: sans-serif; color: #888888; line-height:18px;" class="email-container">
        <tr>
            <td style="padding: 40px 10px;width: 100%;font-size: 12px; font-family: sans-serif; line-height:18px; text-align: center; color: #888888;" class="x-gmail-data-detectors">
                Galastyle<br>79 Kantaras Aven.<br> 3rd Floor,
                <br>
                2043 Strovolos, Nicosia, P.O.Box: 20368 CY 2151
                <br>
                <strong>Phone:</strong> (+357) 22252222
            </td>
        </tr>
    </table>
    <!-- Email Footer : END -->
</center>
</body>
</html>