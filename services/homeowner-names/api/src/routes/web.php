<?php

use App\Http\Controllers\CsvProcessingController;
use App\Http\Middleware\ValidateFileType;
use Illuminate\Support\Facades\Route;

Route::post('parse-csv', [CsvProcessingController::class, 'parse'])->middleware('api', ValidateFileType::class);
