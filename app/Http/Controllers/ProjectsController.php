<?php

namespace App\Http\Controllers;

use App\Models\CustomerRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
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
        $customer_requests = CustomerRequest::all();
        return Inertia::render('Projects/Unacknowledges', [
            "customer_requests" => $customer_requests
        ]);
    }

    public function acknowledgeCustomerRequest(Request $request){
        $customer_request = CustomerRequest::find($request->customer_request['id']);
        $customer_request->accept = 1;
        $customer_request->accepted_by = $request->user_name;
        $customer_request->save();
        return Redirect::back();

    }
}
