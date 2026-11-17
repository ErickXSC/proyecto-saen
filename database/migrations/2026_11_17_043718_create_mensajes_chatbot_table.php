<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mensajes_chatbot', function (Blueprint $table) {
            $table->id('id_mensaje');
            $table->foreignId('id_conversacion')
                  ->constrained('conversaciones', 'id_conversacion')
                  ->onDelete('cascade');
            $table->enum('emisor', ['Usuario', 'Bot']);
            $table->text('contenido');
            $table->timestamp('fecha_envio')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mensajes_chatbot');
    }
};