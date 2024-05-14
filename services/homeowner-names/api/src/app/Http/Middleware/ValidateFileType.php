<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidateFileType
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->hasFile('csv_file')) {
            $csvFile = $request->file('csv_file');
            if ($csvFile->getClientOriginalExtension() !== 'csv') {
                return response()->json(['error' => 'Invalid file type. Only CSV files are allowed.'], 400);
            }
        } else {
            return response()->json(['error' => 'No file provided.'], 400);
        }

        return $next($request);
    }
}
