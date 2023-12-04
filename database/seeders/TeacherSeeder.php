<?php

namespace Database\Seeders;

use App\Models\teacher;
use Illuminate\Database\Seeder;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $numberOfTeachers = 20;
        Teacher::factory()->count($numberOfTeachers)->create();
    }
}
