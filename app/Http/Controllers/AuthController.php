<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Http\Requests\userEditDefaultValuesRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(AuthRequest $request) {
        $data = $request->validated();

        User::create([
            'email' => $data['email'],
            'name' => $data['name'],
            'password' => bcrypt($data['password'])
        ]);

        return $this->login($request);
    }

    public function login(AuthRequest $request) {
        $data = $request->validated();

        if (!Auth::attempt($data)) {
            return response([
                'errors' => ['error' => ['The provided credentials are not correct']]
            ], 422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    /**
     * Zmena zakladnych premennych pouzivatela. Jeho lokalizaciu a jeho povodne
     * miesto pre vyhladavanie pocasie
     * TODO tuto metodu by som premenoval a presunul do noveho controllera, kedze zmena dat usera
     * TODO nema co robit v Auth
     * @param userEditDefaultValuesRequest $request
     * @return Response
     */
    public function userEditDefaultValues(userEditDefaultValuesRequest $request) {
        $data = $request->validated();

        $user = Auth::user();
        $user->update($data);
        return response(['success' => true]);
    }

    public function logout() {
        $user = Auth::user();
        $user->tokens()->delete();
        return response(['success' => true]);
    }
}
