<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AsistenciaAlumno extends Model
{
    protected $table = 'asistencias_alumnos';
    protected $primaryKey = 'id_asistencia';
    public $timestamps = true;

    protected $fillable = [
        'id_alumno',
        'id_horario',
        'fecha',
        'hora_entrada',
        'metodo',
    ];

    protected $casts = [
        'fecha' => 'date',
    ];

    public function alumno(): BelongsTo
    {
        return $this->belongsTo(Alumno::class, 'id_alumno', 'id_alumno');
    }

    public function horario(): BelongsTo
    {
        return $this->belongsTo(Horario::class, 'id_horario', 'id_horario');
    }
}