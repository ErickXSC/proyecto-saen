<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('asistencias_alumnos', function (Blueprint $table) {
            $table->id('id_asistencia');
            $table->foreignId('id_alumno')
                  ->constrained('alumnos', 'id_alumno')
                  ->onDelete('cascade');
            $table->foreignId('id_horario')
                  ->constrained('horarios', 'id_horario')
                  ->onDelete('cascade');
            $table->date('fecha');
            $table->time('hora_entrada');
            $table->enum('metodo', ['QR', 'Manual'])->default('QR');
            $table->timestamps();

            // Evita registrar 2 veces la misma asistencia del mismo alumno en el mismo horario y fecha
            $table->unique(['id_alumno', 'id_horario', 'fecha']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('asistencias_alumnos');
    }
};