<?php

Route::resource('target', 'TargetController');
Route::post('complete', 'TargetController@complete');