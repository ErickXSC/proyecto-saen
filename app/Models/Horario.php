<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Horario extends Model
{
    protected $table = 'horarios';
    protected $primaryKey = 'id_horario';
    public $timestamps = true;

    protected $fillable = [
        'id_profesor',
        'id_carril',
        'dia_semana',
        'hora_inicio',
        'hora_fin',
    ];

    public function profesor(): BelongsTo
    {
        return $this->belongsTo(Profesor::class, 'id_profesor', 'id_profesor');
    }

    public function carril(): BelongsTo
    {
        return $this->belongsTo(Carril::class, 'id_carril', 'id_carril');
    }

    // Relación con los alumnos inscritos (tabla pivote clases_alumnos)
    public function alumnos()
    {
        return $this->belongsToMany(Alumno::class, 'clases_alumnos', 'id_horario', 'id_alumno')
                    ->withPivot('fecha_inscripcion')
                    ->withTimestamps();
    }
}