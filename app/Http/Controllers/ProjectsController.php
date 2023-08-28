<?php

namespace App\Http\Controllers;

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
}
