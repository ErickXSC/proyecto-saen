<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Carril extends Model
{
    protected $table = 'carriles';
    protected $primaryKey = 'id_carril';
    public $timestamps = true;

    protected $fillable = ['numero_carril', 'activo'];

    protected $casts = [
        'activo' => 'boolean',
    ];

    public function horarios(): HasMany
    {
        return $this->hasMany(Horario::class, 'id_carril', 'id_carril');
    }
}