<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function getActivities(Request $request){
        $user_id = $request->query('user');

        if($user_id && $user_id != "null"){
            $activities = DB::table("activity_log")->where("causer_id", $user_id)->orderBy('created_at', 'desc')->get();
        }
        else {
            $activities = DB::table("activity_log")->orderBy('created_at', 'desc')->get();
        }
        $users = User::all();

        return Inertia::render('Activity/Page', [
            'activities' => $activities,
            'users' => $users
        ]);
    }
}
