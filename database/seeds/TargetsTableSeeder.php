<?php

use Illuminate\Database\Seeder;
use Faker\Factory;
use App\Target;

class TargetsTableSeeder extends Seeder
{
	public function run()
	{
		$faker = Factory::create('ru_RU');

		for ($i = 1; $i <= 20; $i++) {
			Target::create([
				'description' => $faker->text($maxNbChars = 50),
				'time' => random_int(1, 15),
				'completed' => false
			]);
		}
	}
}