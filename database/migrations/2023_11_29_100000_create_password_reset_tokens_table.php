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
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->bigInteger('user_id')->nullable()->unsigned();
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();

            // Foreign key constraints
            $table->foreign('user_id')->references('id')->on('users');
        });

        DB::update("ALTER TABLE password_reset_tokens AUTO_INCREMENT = 101;");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('password_reset_tokens');
    }
};
