<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Conversacion extends Model
{
    protected $table = 'conversaciones';
    protected $primaryKey = 'id_conversacion';
    public $timestamps = true;

    protected $fillable = [
        'id_alumno',
        'fecha_inicio',
    ];

    protected $casts = [
        'fecha_inicio' => 'datetime',
    ];

    public function alumno(): BelongsTo
    {
        return $this->belongsTo(Alumno::class, 'id_alumno', 'id_alumno');
    }

    public function mensajes(): HasMany
    {
        return $this->hasMany(MensajeChatbot::class, 'id_conversacion', 'id_conversacion');
    }
}