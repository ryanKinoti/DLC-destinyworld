<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\children>
 */
class ChildrenFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $childDOB = fake()->dateTimeBetween('-12 years', '-3 years');
        $gender = fake()->randomElement(['male', 'female']);

        return [
            'class_id' => \Faker\Factory::create()->numberBetween(101, 105),
            'first_name' => fake()->firstName($gender),
            'last_name' => \Faker\Factory::create()->lastName,
            'date_of_birth' => $childDOB->format('Y-m-d'),
            'gender' => $gender,
            'visitor_status' => \Faker\Factory::create()->randomElement(['yes', 'no']),
        ];
    }
}
