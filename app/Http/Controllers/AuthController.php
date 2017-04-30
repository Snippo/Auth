<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
  public function register(Request $request)
  {
    $this->validate($request, [
      'email'      => 'required|email|unique:users',
      'password'   => 'required|min:6',
    ]);
    $user = new User;
    $user->name = 'null';
    $user->email = trim(strtolower($request->email));
    $user->password = bcrypt($request->password);
    $user->save();
    return response()->json(['status' => 'Success']);
  }
}
