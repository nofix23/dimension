<?php

namespace App\Http\Controllers;

use App\Models\CustomerRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectsController extends Controller
{
    public function getProjects(Request $request){
        $status = $request->get('status');

        // $projects = Project::all();
        $projects = "";
        return Inertia::render('Projects/Projects', [
            "projects" => $projects
        ]);
    }

    public function getActiveRequests(Request $request){
        $customer_requests = CustomerRequest::where('accept', 0)->get();
        return Inertia::render('Projects/Unacknowledges', [
            "customer_requests" => $customer_requests
        ]);
    }
}
