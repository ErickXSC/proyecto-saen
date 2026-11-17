<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('alumnos', function (Blueprint $table) {
            $table->id('id_alumno');
            $table->foreignId('id_cliente')
                  ->constrained('clientes', 'id_cliente')
                  ->onDelete('restrict'); 
            $table->string('nombre_completo', 150);
            $table->date('fecha_nacimiento');
            $table->string('categoria', 50)->nullable(); 
            $table->string('nivel', 50)->nullable();     
            $table->string('codigo_qr', 100)->unique();  
            $table->enum('estado', ['Activo', 'Inactivo', 'Congelado', 'Egresado'])
                  ->default('Activo'); 
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('alumnos');
    }
};