<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Carril extends Model
{
    protected $table = 'carriles';
    protected $primaryKey = 'id_carril';
    public $timestamps = true;

    protected $fillable = ['numero_carril', 'activo', 'id_profesor'];

    public function profesor(): BelongsTo
    {
        return $this->belongsTo(Profesor::class, 'id_profesor', 'id_profesor');
    }

    public function horarios(): HasMany
    {
        return $this->hasMany(Horario::class, 'id_carril', 'id_carril');
    }
}