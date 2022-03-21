<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGateKeepersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gate_keepers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('gate');
            $table->integer('level');
            $table->string('provider');
            $table->text('exceptions')->nullable();
            $table->text('settings')->nullable();
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
        Schema::dropIfExists('gate_keepers');
    }
}
