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
        Schema::create('children', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('class_id')->nullable()->unsigned();
            $table->string('first_name');
            $table->string('last_name');
            $table->date("date_of_birth");
            $table->enum('gender',['male','female']);
            $table->enum('visitor_status', ['yes', 'no'])->default('no')->nullable();
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('class_id')->references('id')->on('classes');
        });

        DB::update("ALTER TABLE children AUTO_INCREMENT = 101;");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('childrens');
    }
};
