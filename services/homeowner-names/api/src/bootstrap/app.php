<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\EnforceResponseHeaders;
use App\Http\Middleware\RemoveSensitiveHeaders;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->append(EnforceResponseHeaders::class);
        $middleware->append(RemoveSensitiveHeaders::class);
        $middleware->validateCsrfTokens(except: ['parse-csv']);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
