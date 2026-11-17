<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('horarios', function (Blueprint $table) {
            $table->id('id_horario');
            $table->foreignId('id_profesor')
                  ->constrained('profesores', 'id_profesor')
                  ->onDelete('restrict');
            $table->foreignId('id_carril')
                  ->constrained('carriles', 'id_carril')
                  ->onDelete('restrict');
            $table->string('dia_semana', 15); // Lunes, Martes...
            $table->time('hora_inicio');
            $table->time('hora_fin');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('horarios');
    }
};