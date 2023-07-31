<?php

namespace App\Services;

use Exception;

class UpdateModel
{
    public $model;
    public $data;

    /**
     * @param Eloquent $model [Updated model]
     * @param array $data [Data to update data]
     */
    function __construct($model, $data)
    {
        $this->model = $model;
        $this->data = $data;
    }

    /**
     * Update a model instance.
     */
    public function updateModel()
    {

        if ($this->model) {
            $model = $this->model;

            /**
             * fill methods use only those properties in the model which are in $fillable array
             */
            $model->fill($this->data);

            $model->save();

            return true;
        }

        throw new Exception("Model not found", 404);
    }
}
