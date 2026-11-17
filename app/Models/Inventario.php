<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Inventario extends Model
{
    protected $table = 'inventario';
    protected $primaryKey = 'id_inventario';
    public $timestamps = true;

    protected $fillable = [
        'nombre_articulo',
        'cantidad_total',
        'stock_minimo',
        'estado',
    ];

    public function prestamos(): HasMany
    {
        return $this->hasMany(Prestamo::class, 'id_inventario', 'id_inventario');
    }
}