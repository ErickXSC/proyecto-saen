<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BaseConocimiento extends Model
{
    protected $table = 'base_conocimiento';
    protected $primaryKey = 'id_conocimiento';
    public $timestamps = true;

    protected $fillable = [
        'tema',
        'contenido',
    ];
}