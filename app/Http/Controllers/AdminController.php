<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Models\Company;
use App\Models\User;
use App\Services\CreateModel;
use App\Services\UpdateModel;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Validation\Rules;


class AdminController extends Controller
{
    public function index(Request $request)
    {

        return Inertia::render('Dashboard', [
            'user' => Auth::user(),
        ]);
    }

    public function addCompany(CreateCompanyRequest $request)
    {
        try {
            $createNewModelService = new CreateModel(new Company(), $request->validated());

            $createNewModelService->createModelFromRequest();

            return Redirect::back();

        }

        catch(Exception $e) {
            return Redirect::back()->withErrors(["errors" => $e->getMessage()]);

        }
    }

    public function getCompanies(Request $request)
    {
        $companies = Company::with(['User'])->get();

        $users = User::all();

        return Inertia::render('Company/Companies', [
            "companies" => $companies,
            "users" => $users
        ]);
    }

    public function updateCompany(UpdateCompanyRequest $request){
        try {

            $updateModelService = new UpdateModel(Company::query()->find($request->id), $request->validated());

            $updateModelService->updateModel();

            return Redirect::back();
        } catch (Exception $e) {
            return Redirect::back()->withErrors(["errors" => $e->getMessage()]);
        }
    }

    public function deleteCompany(Request $request)
    {
        try {

            if($request->type === 'single'){
                $company = Company::find($request->selectedItems['id']);

                $company->delete();

            }

            elseif($request->type === 'multiple'){
                foreach($request->selectedItems as $item){
                    $company = Company::find($item['id']);
                    $company->delete();
                }
            }


            return Redirect::back();


        } catch (Exception $e) {
            return Redirect::back()->withErrors(["errors" => $e->getMessage()]);
        }
    }

    public function createProfile(Request $request){
        try{
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:' . User::class,
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
                'role' => 'required|string',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role,
            ]);

            event(new Registered($user));

            return Redirect::back();

        }
        catch (Exception $e) {
            return Redirect::back()->withErrors(["errors" => $e->getMessage()]);
        }



    }

    public function updateProfile(Request $request){
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'role' => 'required|string',
            ]);

            $updateModelService = new UpdateModel(User::query()->find($request->id), $validated);

            $updateModelService->updateModel();

            return Redirect::back();
        } catch (Exception $e) {
            return Redirect::back()->withErrors(["errors" => $e->getMessage()]);
        }
    }

    public function getProfiles(Request $request){
        $users = User::all();

        return Inertia::render('Profile/Accounts', [
            "users" => $users
        ]);
    }

    public function setAppearance(Request $request){
        $user = User::find(Auth::user()->id);
        $user->header_appearance = $request->appearance;
        $user->save();

        return Redirect::back();
    }
}
