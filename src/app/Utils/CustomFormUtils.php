<?php

namespace Genrubio\BackpackCustomForm\App\Utils;

use Genrubio\BackpackCustomForm\App\Tasks\ValidateInputsTask;
use Genrubio\BackpackCustomForm\App\Tasks\FindInputsInJsonTask;

class CustomFormUtils
{
    public static function findInputs(array $customFormData)
    {
        return collect((new FindInputsInJsonTask($customFormData))->run());
    }

    public static function validateRequestInputs(array $requestInputs, array $customFormData)
    {
        $inputs = self::findInputs($customFormData);
        $errorFields = (new ValidateInputsTask($requestInputs, $inputs))->run();
        return [
            'isValid' => count($errorFields) == 0,
            'errorFields' => $errorFields,
        ];
    }
}
