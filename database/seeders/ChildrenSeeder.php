<?php

namespace Database\Seeders;

use App\Models\children;
use Illuminate\Database\Seeder;

class ChildrenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void{
        //
        $numberOfChildren = 500;
        children::factory()->count($numberOfChildren)->create();
    }
}
