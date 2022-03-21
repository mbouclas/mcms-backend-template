<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->text('body');
            $table->text('user_groups')->nullable();
            $table->text('users')->nullable();
            $table->text('user_id');
            $table->text('settings')->nullable();
            $table->text('thumb')->nullable();
            $table->string('priority')->default('normal')->nullable();
            $table->string('type')->default('normal');
            $table->string('sent')->default('queued');
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
        Schema::dropIfExists('notifications');
    }
}
