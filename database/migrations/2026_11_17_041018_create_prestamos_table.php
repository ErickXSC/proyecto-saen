<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('prestamos', function (Blueprint $table) {
            $table->id('id_prestamo');
            $table->foreignId('id_inventario')
                  ->constrained('inventario', 'id_inventario')
                  ->onDelete('restrict');
            $table->foreignId('id_alumno')
                  ->constrained('alumnos', 'id_alumno')
                  ->onDelete('cascade');
            $table->integer('cantidad');
            $table->timestamp('fecha_prestamo')->useCurrent();
            $table->timestamp('fecha_devolucion')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('prestamos');
    }
};