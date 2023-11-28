<?php

namespace Database\Seeders;

use App\Models\teachers;
use Illuminate\Database\Seeder;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $numberOfTeachers = 20;
        teachers::factory()->count($numberOfTeachers)->create();
    }
}
