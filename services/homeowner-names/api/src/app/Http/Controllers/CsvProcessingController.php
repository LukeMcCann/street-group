<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CsvProcessingController extends Controller
{
    public function parse(Request $request) {
        if ($request->hasFile('file')) {
          $csvFile = $request->file('file');

          $people = [];

          $csvData = array_map('str_getcsv', file($csvFile));

          $storagePath = storage_path('app/csv');
          if (!file_exists($storagePath)) {
            mkdir($storagePath, 0755, true);
          }
          $storageFileName = time() . '_' . $csvFile->getClientOriginalName();
          $csvFile->move($storagePath, $storageFileName);

          foreach ($csvData as $rowData) {
            $name = $rowData[0];

            $peopleData = $this->splitName($name);

            foreach ($peopleData as $person) {
              $people[] = $person;
            }
          }

          return response()->json(['people' => $people, 'csv_file_path' => storage_path('app/csv/' . $storageFileName)]);
        } else {
          return response()->json(['error' => 'File not found'], 400);
        }
      }

    private function splitName($name) {
        $people = [];

        $patterns = [
            '/^(?<title>[a-zA-Z]+)\s+(?<first_name>[a-zA-Z]+)\s+(?<last_name>[a-zA-Z]+)$/',
            '/^(?<title>[a-zA-Z]+)\s+(?<initial>[a-zA-Z])\.\s+(?<last_name>[a-zA-Z]+)$/',
            '/^(?<title>[a-zA-Z]+)\s+and\s+(?<title2>[a-zA-Z]+)\s+(?<last_name>[a-zA-Z]+)$/'
        ];

        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $name, $matches)) {
                $person = [
                    'title' => isset($matches['title']) ? $matches['title'] : null,
                    'first_name' => isset($matches['first_name']) ? $matches['first_name'] : null,
                    'initial' => isset($matches['initial']) ? $matches['initial'] : null,
                    'last_name' => $matches['last_name']
                ];

                if (isset($matches['title2'])) {
                    $person['title'] = $matches['title'];
                    $people[] = $person;
                    $person['title'] = $matches['title2'];
                    $people[] = $person;
                } else {
                    $people[] = $person;
                }

                break;
            }
        }

        return $people;
    }
}
