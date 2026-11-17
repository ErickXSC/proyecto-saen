<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cliente extends Model
{
    protected $table = 'clientes';
    protected $primaryKey = 'id_cliente';
    public $timestamps = true;

    protected $fillable = [
        'nombre_completo',
        'telefono',
        'email',
        'direccion',
    ];

    public function alumnos(): HasMany
    {
        return $this->hasMany(Alumno::class, 'id_cliente', 'id_cliente');
    }
}