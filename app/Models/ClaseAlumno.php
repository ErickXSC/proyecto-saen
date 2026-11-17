<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClaseAlumno extends Model
{
    protected $table = 'clases_alumnos';
    protected $primaryKey = 'id_inscripcion';
    public $timestamps = true;

    protected $fillable = [
        'id_alumno',
        'id_horario',
        'fecha_inscripcion',
    ];

    protected $casts = [
        'fecha_inscripcion' => 'date',
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