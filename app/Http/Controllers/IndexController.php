<?php

namespace App\Http\Controllers;

use App\Models\CustomerRequest;
use App\Services\CreateModel;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function index(){
        return Inertia::render("Customer/Page");
    }

    public function handleCustomerRequest(Request $request){
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'phone_number' => 'max:255',
                'email_address' => 'required|string|email|max:255',
                'subject' => 'required|string|max:255',
                'comments' => 'required',
            ]);

            $createModelService = new CreateModel(new CustomerRequest, $validated);

            $createModelService->createModelFromRequest();

            return Redirect::back();
        } catch (Exception $e) {
            return Redirect::back()->withErrors(["errors" => $e->getMessage()]);
        }
    }
}
