<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\teachers>
 */
class TeachersFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender = fake()->randomElement(['male', 'female']);
        $first_name = fake()->firstName($gender);
        $last_name = fake()->lastName();
        $com_domain = fake()->randomElement(['gmail.com', 'yahoo.com', 'outlook.com', 'icloud.com']);
        return [
            'class_id' => fake()->numberBetween(101, 105),
            'first_name' => $first_name,
            'last_name' => $last_name,
            'email' => strtolower($first_name . '.' . $last_name . '@' . $com_domain),
            'phone_number' => '+2547' . fake()->randomNumber(8, true),
        ];
    }
}
