<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inventario', function (Blueprint $table) {
            $table->id('id_inventario');
            $table->string('nombre_articulo', 100);
            $table->integer('cantidad_total')->default(0);
            $table->integer('stock_minimo')->default(5);
            $table->enum('estado', ['Bueno', 'Regular', 'Malo'])->default('Bueno');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inventario');
    }
};