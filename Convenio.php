php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Convenio extends Model
{
    protected $table = 'convenio';
    protected $primaryKey = 'id_convenio';
    public $timestamps = true;

    protected $fillable = [
        'nombre_institucion',
        'tipo_beneficio',
        'descuento_porcentaje',
        'fecha_inicio',
        'fecha_fin',
        'estado'
    ];

    protected $casts = [
        'fecha_inicio' => 'date',
        'fecha_fin' => 'date',
        'descuento_porcentaje' => 'decimal:2',
    ];
}
