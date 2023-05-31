<?php

use Illuminate\Http\Request;
use App\Http\Controllers\QuoteController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('ajouter',[QuoteController::class,'store'])->name('ajouter');
Route::get('index',[QuoteController::class,'index'])->name('index');
Route::delete('destroy/{id}',[QuoteController::class,'destroy'])->name('destroy');
Route::get('countfavorite',[QuoteController::class,'countfavorite'])->name('countfavorite');