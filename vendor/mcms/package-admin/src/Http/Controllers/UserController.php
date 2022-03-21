<?php

namespace Mcms\Admin\Http\Controllers;

use Mcms\Admin\Mailables\ResetPasswordNotification;
use Mcms\Core\ExtraFields\ExtraFields;
use Mcms\Core\Models\Filters\ExtraFieldFilters;
use Mcms\Core\SettingsManager\SettingsManager;
use Illuminate\Auth\Passwords\TokenRepositoryInterface;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller;;
use Mcms\Core\Models\Filters\UserFilters;
use Mcms\Core\Services\User\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Password;


class UserController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests, ResetsPasswords;

    protected $user;


    public function __construct(UserService $userService)
    {
        $this->user = $userService;
    }
    public function show($id, UserFilters $filters, ExtraFieldFilters $extraFieldFilters)
    {
        $filters->request->merge(['id' => $id]);
        $user = $this->user
            ->filter($filters, [
                'unhide' => ['created_at', 'updated_at', 'activated_at', 'active', 'awaits_moderation'],
                'with' => ['extraFields', 'extraFields.field', 'roles', 'userPermissions']
            ])
            ->first();

        $extraFieldFilters->request->merge(['id' => null]);//reset the previous merge
        $extraFieldFilters->request->merge(['model' => str_replace('\\','\\\\',get_class($this->user->model))]);
        $additionalInfo = $this->additionalUserInfo($extraFieldFilters);
        return  response([
            'user' => ($user) ? $user->toArray() : null,
            'profileSettings' => $additionalInfo['profileSettings'],
            'extraFields' => $additionalInfo['extraFields'],
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(UserFilters $filters,  ExtraFieldFilters $extraFieldFilters)
    {
/*        \DB::listen(function($sql) {
            var_dump($sql->sql);
            var_dump($sql->bindings);
        });*/
        $results = $this->user
            ->filter($filters, [
                'unhide' => ['created_at', 'updated_at', 'activated_at', 'active', 'awaits_moderation'],
                'with' => ['extraFields', 'extraFields.field', 'roles', 'userPermissions']
            ])
            ->toArray();

        $extraFieldFilters->request->merge(['model' => str_replace('\\','\\\\',get_class($this->user->model))]);
        $additionalInfo = $this->additionalUserInfo($extraFieldFilters);

        $results['profileSettings'] = $additionalInfo['profileSettings'];
        $results['extraFields'] =  $additionalInfo['extraFields'];
        return  $results;
    }

    private function additionalUserInfo($extraFieldFilters = []){
        $profileSettings = SettingsManager::find('user-profiles');
        $extraFieldService = new ExtraFields();
        return [
            'profileSettings' => ( ! $profileSettings) ? [] : $profileSettings->fields,
            'extraFields' => $extraFieldService->model->filter($extraFieldFilters)->get(),
        ];
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->user->store($request->toArray(), true);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $User = $this->user->update($id, $request->toArray());

        return response($User);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = $this->user->destroy($id);
        return response(['success' => $result]);
    }

    public function widgetPositions(Request $request)
    {
        $userSettings = \Auth::user()->settings;
        if ( ! is_array($userSettings)){
            $userSettings = [
                'widgetPositions' => $request->all()
            ];
        } else {
            $userSettings['widgetPositions'] = $request->all();
        }

        $this->user->update(\Auth::user()->id, ['settings' => $userSettings]);

        return response([ 'success' => true ]);
    }

    public function sendPasswordResetLink(Request $request)
    {
        $fail = ['success' => false];

        if ( ! $request->has('email')){
            $fail['reason'] = 'No email provided';
            return response($fail);
        }
        //check for user in the DB
        $user = $this->user->model->where('email', $request->email)->first();
        if ( ! $user){
            $fail['reason'] = 'email not found';
            return response($fail);
        }

        //reset
        $this->sendResetLink($user);

//
        return response(Password::RESET_LINK_SENT);
    }

    public function resetPassword(Request $request)
    {
        return $this->reset($request);
    }

    public function sendResetLink($user)
    {
        $tokens = Password::getRepository();
        return $user->notify(new ResetPasswordNotification($tokens->create($user)));
    }

    public function broker()
    {
        return Password::broker();
    }

    public function reset(Request $request)
    {
        $this->validate($request, $this->rules(), []);
        $tokens = Password::getRepository();

        // Here we will attempt to reset the user's password. If it is successful we
        // will update the password on an actual user model and persist it to the
        // database. Otherwise we will parse the error and return the response.
        $userService = new UserService();
        $user = $userService->model->where('email', $request->email)->first();
        if ( ! $user){
            return response(['success' => false, 'reason' => 'noUser']);
        }

        if ( ! $tokens->exists($user, $request->token)) {

            return response(['success' => false, 'reason' => 'invalidToken']);
        }

        $user->forceFill([
            'password' => bcrypt($request->password),
            'remember_token' => Str::random(60),
        ])->save();


        $tokens->delete($request->token);

        return response(['success' => true]);
    }

    public function validateField(Request $request)
    {
        return $this->user->model->where($request->field, $request->value)->first();
    }
}
