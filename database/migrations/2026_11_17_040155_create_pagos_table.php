<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pagos', function (Blueprint $table) {
            $table->id('id_pago');
            $table->foreignId('id_alumno')
                  ->constrained('alumnos', 'id_alumno')
                  ->onDelete('restrict');
            $table->foreignId('id_concepto')
                  ->constrained('conceptos_pago', 'id_concepto');
            $table->foreignId('id_promocion')
                  ->nullable()
                  ->constrained('promociones', 'id_promocion')
                  ->onDelete('set null');
            $table->decimal('monto_original', 10, 2);
            $table->decimal('monto_final', 10, 2);
            $table->date('fecha_pago');
            $table->enum('estado', ['Pagado', 'Pendiente', 'Cancelado'])->default('Pagado');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pagos');
    }
};