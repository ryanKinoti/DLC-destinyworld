<?php

namespace Database\Seeders;

use App\Models\parents;
use Illuminate\Database\Seeder;

class ParentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $numberOfParents = 250;
        parents::factory()->count($numberOfParents)->create();
    }
}
