<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('register', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('class_id')->nullable()->unsigned();
            $table->bigInteger('child_id')->nullable()->unsigned();
            $table->enum('month', ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
            $table->string('year');
            $table->date('date');
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('class_id')->references('id')->on('classes');
            $table->foreign('child_id')->references('id')->on('children');
        });

        DB::update("ALTER TABLE register AUTO_INCREMENT = 101;");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registers');
    }
};
