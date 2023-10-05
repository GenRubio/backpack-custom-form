<?php

namespace Genrubio\BackpackCustomForm\App\Tasks;

class FindInputsInJsonTask
{
    private $jsonData;

    public function __construct($jsonData)
    {
        $this->jsonData = $jsonData;
    }

    public function run()
    {
        return $this->findName($this->jsonData);
    }

    private function findName($array, &$results = [])
    {
        foreach ($array as $key => $value) {
            if ($key === 'name') {
                $results[] = $array;
            }

            if (is_array($value)) {
                $this->findName($value, $results);
            }
        }
        return $results;
    }
}
