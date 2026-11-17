<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('base_conocimiento', function (Blueprint $table) {
            $table->id('id_conocimiento');
            $table->string('tema', 100); 
            $table->text('contenido');   
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('base_conocimiento');
    }
};