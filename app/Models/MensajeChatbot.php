<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MensajeChatbot extends Model
{
    protected $table = 'mensajes_chatbot';
    protected $primaryKey = 'id_mensaje';
    public $timestamps = true;

    protected $fillable = [
        'id_conversacion',
        'emisor',
        'contenido',
        'fecha_envio',
    ];

    protected $casts = [
        'fecha_envio' => 'datetime',
    ];

    public function conversacion(): BelongsTo
    {
        return $this->belongsTo(Conversacion::class, 'id_conversacion', 'id_conversacion');
    }
}