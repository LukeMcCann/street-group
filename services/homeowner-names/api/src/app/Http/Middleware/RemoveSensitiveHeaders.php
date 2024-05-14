<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RemoveSensitiveHeaders
{
    const SENSITIVE_HEADERS = [
        'X-Powered-By',
        'server',
    ];

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        foreach (self::SENSITIVE_HEADERS as $header) {
            $response->headers->remove($header);
        }

        return $response;
    }
}
