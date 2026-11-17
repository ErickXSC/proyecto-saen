<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AsistenciaProfesor extends Model
{
    protected $table = 'asistencias_profesores';
    protected $primaryKey = 'id_asistencia_profesor';
    public $timestamps = true;

    protected $fillable = [
        'id_profesor',
        'fecha',
        'hora_entrada',
        'hora_salida',
    ];

    protected $casts = [
        'fecha' => 'date',
    ];

    public function profesor(): BelongsTo
    {
        return $this->belongsTo(Profesor::class, 'id_profesor', 'id_profesor');
    }
}