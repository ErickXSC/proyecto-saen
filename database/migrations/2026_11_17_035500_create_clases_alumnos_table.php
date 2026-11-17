<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clases_alumnos', function (Blueprint $table) {
            $table->id('id_inscripcion');
            $table->foreignId('id_alumno')
                  ->constrained('alumnos', 'id_alumno')
                  ->onDelete('cascade');
            $table->foreignId('id_horario')
                  ->constrained('horarios', 'id_horario')
                  ->onDelete('cascade');
            $table->date('fecha_inscripcion');
            $table->timestamps();

            // Un alumno no puede estar inscrito dos veces al mismo horario
            $table->unique(['id_alumno', 'id_horario']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clases_alumnos');
    }
};