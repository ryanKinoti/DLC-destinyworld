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
        Schema::create('families', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('parent_id')->nullable()->unsigned();
            $table->bigInteger('child_id')->nullable()->unsigned();
            $table->enum('relation_type', ['Mother', 'Father', 'Guardian']);
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('parent_id')->references('id')->on('parents');
            $table->foreign('child_id')->references('id')->on('children');
        });

        DB::update("ALTER TABLE families AUTO_INCREMENT = 101;");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('families');
    }
};
