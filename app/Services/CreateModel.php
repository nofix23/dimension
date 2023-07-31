<?php

namespace App\Services;

class CreateModel
{
    public $model;
    public $sanitizedData;

    function __construct($model, $sanitizedData)
    {
        $this->model = $model;
        $this->sanitizedData = $sanitizedData;
    }

    /**
     * Create a new model instance.
     */
    public function createModelFromRequest()
    {
        $modelData = [];

        foreach (array_keys($this->sanitizedData) as $field) {
            if (isset($this->sanitizedData[$field])) {
                $modelData[$field] = $this->sanitizedData[$field];
            }
        }

        $model = $this->model::create($modelData);

        return $model;
    }
}
