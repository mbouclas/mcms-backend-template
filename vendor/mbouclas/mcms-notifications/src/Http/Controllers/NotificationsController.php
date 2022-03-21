<?php

namespace Mcms\Notifications\Http\Controllers;



use Config;
use Mcms\Notifications\Models\Filters\NotificationFilters;
use Mcms\Notifications\Service\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class NotificationsController extends Controller
{
    protected $notificationService;

    public function __construct(NotificationService $notification)
    {
        $this->notificationService = $notification;
    }

    public function config()
    {
        return response(Config::get('mcmsNotifications'));
    }

    public function index(NotificationFilters $filters)
    {
        return $this->notificationService
            ->model
            ->filter($filters)
            ->paginate($filters->request->has('limit') ? $filters->request->limit : 10);
    }

    public function show($id)
    {
        return $this->notificationService
            ->model
            ->find($id);
    }

    public function store(Request $request)
    {
        return $this->notificationService->store($request->all());
    }

    public function update(Request $request, $id)
    {
        return $this->notificationService->update($id, $request->all());
    }

    public function destroy($id)
    {
        $this->notificationService->destroy($id);
        return response(['success' => true]);
    }
}