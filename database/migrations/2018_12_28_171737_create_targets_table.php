<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTargetsTable extends Migration
{
    public function up()
    {
        Schema::create('targets', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('description');
            $table->integer('time');
            $table->boolean('completed');
        });
    }

    public function down()
    {
        Schema::dropIfExists('targets');
    }
}