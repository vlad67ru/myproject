<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Target extends Model
{
    protected $fillable = [
        'description',
        'time',
        'completed'
    ];

    protected $casts = [
        'created_at' => 'timestamp'
    ];
}