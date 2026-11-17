<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('conversaciones', function (Blueprint $table) {
            $table->id('id_conversacion');
            $table->foreignId('id_alumno')
                  ->nullable()
                  ->constrained('alumnos', 'id_alumno')
                  ->onDelete('set null');
            $table->timestamp('fecha_inicio')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('conversaciones');
    }
};