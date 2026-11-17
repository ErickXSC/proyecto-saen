<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profesores', function (Blueprint $table) {
            $table->id('id_profesor');
            $table->foreignId('id_usuario')
                  ->constrained('usuarios', 'id_usuario')
                  ->onDelete('cascade'); // Si se borra el usuario, se borra el profesor
            $table->string('especialidad', 100)->nullable();
            $table->string('telefono', 15)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profesores');
    }
};
