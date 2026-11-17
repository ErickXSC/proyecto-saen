<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Promocion extends Model
{
    protected $table = 'promociones';
    protected $primaryKey = 'id_promocion';
    public $timestamps = true;

    protected $fillable = [
        'nombre',
        'descuento_porcentaje',
        'activa',
    ];

    protected $casts = [
        'descuento_porcentaje' => 'decimal:2',
        'activa' => 'boolean',
    ];

    public function pagos(): HasMany
    {
        return $this->hasMany(Pago::class, 'id_promocion', 'id_promocion');
    }
}