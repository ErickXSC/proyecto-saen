<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Alumno extends Model
{
    protected $table = 'alumnos';
    protected $primaryKey = 'id_alumno';
    public $timestamps = true;

    protected $fillable = [
        'id_cliente',
        'nombre_completo',
        'fecha_nacimiento',
        'categoria',
        'nivel',
        'codigo_qr',
        'estado',
    ];

    protected $casts = [
        'fecha_nacimiento' => 'date',
    ];

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Cliente::class, 'id_cliente', 'id_cliente');
    }

    public function inscripciones(): HasMany
    {
        return $this->hasMany(ClaseAlumno::class, 'id_alumno', 'id_alumno');
    }

    public function asistencias(): HasMany
    {
        return $this->hasMany(AsistenciaAlumno::class, 'id_alumno', 'id_alumno');
    }

    public function pagos(): HasMany
    {
        return $this->hasMany(Pago::class, 'id_alumno', 'id_alumno');
    }

    public function prestamos(): HasMany
    {
        return $this->hasMany(Prestamo::class, 'id_alumno', 'id_alumno');
    }

    public function conversaciones(): HasMany
    {
        return $this->hasMany(Conversacion::class, 'id_alumno', 'id_alumno');
    }
}