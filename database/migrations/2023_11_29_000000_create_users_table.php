<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('teacher_id')->nullable();
            $table->bigInteger('parent_id')->nullable();
            $table->enum('user_type', ['admin', 'teacher'])->default('teacher');
            $table->string('email')->unique();
            $table->string('google_id')->unique()->nullable();
            $table->enum('account_status', ['active', 'inactive'])->default('inactive');
            $table->string('password');
            $table->string('google_token')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('profile_picture')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
