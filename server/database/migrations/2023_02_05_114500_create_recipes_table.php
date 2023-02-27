<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->longText('text');
            $table->foreignId('kitchen_id')->constrained();
            $table->foreignId('category_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->integer('calories')->nullable();
            $table->integer('rating')->nullable();
            $table->char('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recipes');
    }
};
