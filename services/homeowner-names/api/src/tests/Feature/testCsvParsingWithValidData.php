<?php

namespace Tests\Feature;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class CsvProcessingTest extends TestCase
{
    /**
     * Test parsing CSV file with valid data.
     *
     * @return void
     */
    public function testCsvParsingWithValidData()
    {
        $fileContent = "Mr John Smith\nMrs Jane Doe";
        Storage::fake('csv');
        Storage::put('csv/test.csv', $fileContent);

        $response = $this->postJson('/parse-csv', [
            'file' => UploadedFile::fake()->create('test.csv')
        ]);

        $response->assertStatus(200);

        $response->assertJson([
            'people' => [
                [
                    'title' => 'Mr',
                    'first_name' => 'John',
                    'initial' => null,
                    'last_name' => 'Smith'
                ],
                [
                    'title' => 'Mrs',
                    'first_name' => 'Jane',
                    'initial' => null,
                    'last_name' => 'Doe'
                ]
            ]
        ]);

        $response->assertJsonPath('csv_file_path', storage_path('app/csv/test.csv'));
    }

    /**
     * Test parsing CSV file with invalid data.
     *
     * @return void
     */
    public function testCsvParsingWithInvalidData()
    {
        $response = $this->postJson('/parse-csv');

        $response->assertStatus(400);

        $response->assertJson([
            'error' => 'File not found'
        ]);
    }
}
