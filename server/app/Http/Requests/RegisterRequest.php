<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
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
            'name' => 'required|string|unique:users,name|max:20',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'confirmed',
                Password::min(5)
            ],
            'role' => ['required', 'string']
        ];
    }

    public function messages()
    {
        return [
            "name" => 'Имя пользователя уже используется',
            'email' => 'Email уже используется',
            'password' => 'Поле пароль обязательное',
            'confirmed' => 'Повторный пароль неверен'
        ];
    }
}
