<?php


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::post('/oauth/token', [
    'uses' => '\Laravel\Passport\Http\Controllers\AccessTokenController@issueToken',
    'middleware' => 'throttle'
]);

Route::get('/', function () {
    return view('angular');
})->name('angular');

Route::get('/login', function () {
    return view('angular');
})->name('login');

Route::get('{all}', function () {
    return View::make('angular');
});
