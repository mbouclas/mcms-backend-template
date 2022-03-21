<?php

namespace Mcms\Admin\Http\Controllers\Auth;
use Mcms\Core\Models\User;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Foundation\Auth\Access\AuthorizesResources;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Validator, Auth, URL;

class AuthController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests, ThrottlesLogins;

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'logout', 'getLogout']);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    }

    /**
     * Login the user
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function login(Request $request)
    {
        $auth = false;
        $request->merge(['active' => true]);
        $credentials = $request->only('email', 'password', 'active');
        $user = null;

        if (Auth::attempt($credentials, $request->has('remember'))) {
            $user = Auth::user();
            $auth = true; // Success
        } else {
            return response(['error' => 'errors.login.failed'], 403);
        }

        if ( ! $user->hasRole(['admin','su', 'god']) && ! $user->hasRole(\Config::get('admin.adminRoles'))) {
            Auth::logout();
            return response(['error' => 'errors.login.notAuthorizedResource'], 403);
        }

        $user->roles = $user->getRoles();
        $user->permissions = $user->getPermissions();

        return response()->json([
            'user' => $user->toArray(),
            'auth' => $auth,
            'intended' => URL::previous()
        ]);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        Auth::logout();

        return response()->json([
            'logout' => 'success'
        ]);

    }

}