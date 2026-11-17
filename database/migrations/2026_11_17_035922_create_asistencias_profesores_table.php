<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('asistencias_profesores', function (Blueprint $table) {
            $table->id('id_asistencia_profesor');
            $table->foreignId('id_profesor')
                  ->constrained('profesores', 'id_profesor')
                  ->onDelete('cascade');
            $table->date('fecha');
            $table->time('hora_entrada');
            $table->time('hora_salida')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('asistencias_profesores');
    }
};