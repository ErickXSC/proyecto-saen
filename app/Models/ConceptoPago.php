<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ConceptoPago extends Model
{
    protected $table = 'conceptos_pago';
    protected $primaryKey = 'id_concepto';
    public $timestamps = true;

    protected $fillable = ['nombre_concepto'];

    public function pagos(): HasMany
    {
        return $this->hasMany(Pago::class, 'id_concepto', 'id_concepto');
    }
}