<?php

namespace FrontEnd\Http\Middleware;

use Closure;

class AstroAuthentication
{
    public function handle($request, Closure $next, $guard = null)
    {
        $key = $request->header('x-astro-key');

        if (!$key) {
            return response('Unauthorized.', 401);
        }

        if ($key != env('ASTRO_KEY')) {
            return response('Unauthorized.', 401);
        }


        return $next($request);
    }
}