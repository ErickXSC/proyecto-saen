<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('conceptos_pago', function (Blueprint $table) {
            $table->id('id_concepto');
            $table->string('nombre_concepto', 100);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('conceptos_pago');
    }
};