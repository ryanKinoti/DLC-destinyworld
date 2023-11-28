<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClassesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('classes')
            ->insert(
                [
                    [
                        'class_name' => 'Dazzlers',
                        'created_at' => Carbon::create(2020, 1, 1, 12, 30, 30),
                        'updated_at' => now(),
                    ],
                    [
                        'class_name' => 'Dreamers',
                        'created_at' => Carbon::create(2020, 1, 1, 12, 30, 30),
                        'updated_at' => now(),
                    ],
                    [
                        'class_name' => 'Dynamites',
                        'created_at' => Carbon::create(2020, 1, 1, 12, 30, 30),
                        'updated_at' => now(),
                    ],
                    [
                        'class_name' => 'Discoverers',
                        'created_at' => Carbon::create(2020, 1, 1, 12, 30, 30),
                        'updated_at' => now(),
                    ],
                    [
                        'class_name' => 'Doers',
                        'created_at' => Carbon::create(2020, 1, 1, 12, 30, 30),
                        'updated_at' => now(),
                    ],
                ]
            );
    }
}
