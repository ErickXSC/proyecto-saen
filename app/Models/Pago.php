<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pago extends Model
{
    protected $table = 'pagos';
    protected $primaryKey = 'id_pago';
    public $timestamps = true;

    protected $fillable = [
        'id_alumno',
        'id_concepto',
        'id_promocion',
        'monto_original',
        'monto_final',
        'fecha_pago',
        'estado',
    ];

    protected $casts = [
        'monto_original' => 'decimal:2',
        'monto_final' => 'decimal:2',
        'fecha_pago' => 'date',
    ];

    public function alumno(): BelongsTo
    {
        return $this->belongsTo(Alumno::class, 'id_alumno', 'id_alumno');
    }

    public function concepto(): BelongsTo
    {
        return $this->belongsTo(ConceptoPago::class, 'id_concepto', 'id_concepto');
    }

    public function promocion(): BelongsTo
    {
        return $this->belongsTo(Promocion::class, 'id_promocion', 'id_promocion');
    }
}