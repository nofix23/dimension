<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Redirect;

class UpdateCompanyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'company_name' => 'required|max:255',
            'country' => 'max:255',
            'city' => 'max:255',
            'postal_code' => 'max:255',
            'street' => 'max:255',
            'house_number' => 'max:255',
            'door_bell' => 'max:255',
            'email_address' => 'required|email|max:255',
            'phone_number' => 'required|max:255',
            'website' => 'nullable',
            'user_id' => 'max:255',
            'comment' => '',
            'ranking' => 'nullable',
            'active' => ''
        ];
    }

    protected function failedValidation(Validator $validator)
    {

        $errors = $validator->errors();

        throw new HttpResponseException(
            Redirect::back()
                ->withErrors(['errors' => print_r($errors, true)])
                ->withInput()
        );
    }
}
