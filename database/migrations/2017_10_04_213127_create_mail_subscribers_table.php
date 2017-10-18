<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMailSubscribersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mail_subscribers', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('email')->unique()->index();
            $table->string('service');
            $table->string('firstName')->nullable();
            $table->string('lastName')->nullable();
            $table->text('data')->nullable();
            $table->boolean('converted_to_user')->default(false)->nullable();
            $table->integer('user_id')->nullable()->unique()->index()->unsigned();
            $table->dateTime('converted_at')->nullable();
            $table->string('link_hash')->nullable()->index();
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
        Schema::dropIfExists('mail_subscribers');
    }
}
