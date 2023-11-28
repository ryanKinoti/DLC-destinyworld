<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('class_id')->nullable()->unsigned();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('google_email');
            $table->string('phone_number');
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('class_id')->references('id')->on('classes');
        });

        DB::update("ALTER TABLE teachers AUTO_INCREMENT = 101;");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
