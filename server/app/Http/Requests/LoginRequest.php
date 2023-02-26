<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|exists:users,name',
            'password' => 'required'
        ];
    }

    public function messages()
    {
        return [
            "name" => 'Неверное имя пользователя или пароль',
            'password' => 'Поле пароль обязательное'
        ];
    }
}
