<?php

namespace Mcms\Notifications\Service;


use Auth;
use Mcms\Notifications\Models\Notification;
use Mcms\Core\QueryFilters\Filterable;
use Illuminate\Support\Collection;

/**
 * Class NotificationService
 * @package Mcms\Notifications\Service
 */
class NotificationService
{
    use Filterable;

    /**
     * @var Notification
     */
    public $model;
    /**
     * @var mixed
     */
    public $config;

    /**
     * NotificationService constructor.
     */
    public function __construct()
    {
        $this->model = new Notification();
        $this->config = \Config::get('mcmsNotifications');
    }

    /**
     * @param $id
     * @param array $item
     * @return mixed
     */
    public function update($id, array $item)
    {
        $Item = $this->model->find($id);
        $Item->update($item);
        $this->attachUsers($Item);



        return $Item;
    }

    /**
     * @param array $item
     * @return static
     */
    public function store(array $item)
    {
        $item['user_id'] = (!isset($item['user_id'])) ? Auth::user()->id : $item['user_id'];

        $Item = $this->model->create($item);
        $this->attachUsers($Item);
        //check notification type
        $notification = $this->notificationTypes()->where('key', $item['type'])->first();
        if ($notification['processor']){
            (new $notification['processor'])->handle($notification, $Item->id);
        }

        return $Item;
    }

    /**
     * @param $id
     * @return bool
     */
    public function destroy($id)
    {
        $Item = $this->model->find($id);
        $Item->delete();

        return true;
    }

    /**
     * @return Collection
     */
    public function notificationTypes()
    {
        $notifications = new Collection();
        $allNotifications = $this->config['notificationTypes'];

        foreach ($allNotifications as $key => $value){
            $notifications->push(array_merge($value, ['key' => $key]));
        }

        return $notifications;
    }

    /**
     * @param $userId
     * @return mixed
     */
    public function check($userId)
    {
        $user = (Auth::user()->id !== $userId) ? $this->userModel($userId) : Auth::user();

        //check for private unread first
        $private = $user->notifications(0)->get();

        //now check global
        $global = $this->model->whereNotIn('id', $private->pluck('id'))->get();

        //merge
        return $private->merge($global);
    }

    /**
     * @param Notification $Item
     */
    private function attachUsers(Notification $Item){
        if (is_array($Item->users) && count($Item->users) > 0){
            $tmp = [];
            foreach ($Item->users as $user) {
                $tmp[] = $user['id'];
            }

            $Item->users()->attach($tmp);
        }

    }

    /**
     * @param $id
     * @return mixed
     */
    private function userModel($id)
    {
        $userModel = \Config::get('auth.providers.users.model');
        return (new $userModel())->find($id);
    }
}