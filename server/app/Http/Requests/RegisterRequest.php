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
            'role' => ['required', 'string'],
            'profilePicture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Введите имя пользователя',
            'name.string' => 'Имя пользователя должно быть строкой',
            'name.unique' => 'Имя пользователя уже используется',
            'name.max' => 'Имя пользователя не должно превышать 20 символов',

            'email.required' => 'Введите email',
            'email.email' => 'Введите действительный email',
            'email.unique' => 'Email уже используется',

            'password.required' => 'Введите пароль',
            'password.confirmed' => 'Подтверждение пароля не совпадает',
            'password.min' => 'Пароль должен содержать минимум :min символов',

            'role.required' => 'Введите роль',
            'role.string' => 'Роль должна быть строкой',

            'profilePicture.required' => 'Загрузите изображение',
            'profilePicture.image' => 'Файл должен быть изображением',
            'profilePicture.mimes' => 'Изображение должно быть формата: jpeg, png, jpg',
            'profilePicture.max' => 'Размер изображения не должен превышать 2 МБ'
        ];
    }
}
