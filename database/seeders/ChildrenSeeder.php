<?php

namespace Database\Seeders;

use App\Models\Child;
use Database\Factories\ChildrenFactory;
use Illuminate\Database\Seeder;

class ChildrenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $numberOfChildren = 500;
        Child::factory()->count($numberOfChildren)->create();
    }
}
