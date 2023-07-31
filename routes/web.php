<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




// System routes guest

Route::middleware('guest')->group(function () {

    Route::get('/', [IndexController::class, 'index']);

});



// System routes for admin

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {

    Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');

    // Routes for company

    Route::prefix('/company')->group(function () {

        Route::post('/create', [AdminController::class, 'addCompany']);

        Route::get('/all', [AdminController::class, 'getCompanies']);

        Route::patch('/update', [AdminController::class, 'updateCompany']);

        Route::post('/delete', [AdminController::class, 'deleteCompany']);



    });

    Route::prefix('/profile')->group(function () {

        Route::post('/create', [AdminController::class, 'createProfile']);

        Route::post('/update', [AdminController::class, 'updateProfile']);

        Route::get('/all', [AdminController::class, 'getProfiles']);


    });




});


// System routes for customer

Route::middleware(['auth', 'verified', 'role:customer'])->group(function () {

    Route::prefix('/customer')->group(function () {

        Route::get('/', [CustomerController::class, 'index']);

    });

});

// System routes for company

Route::middleware(['auth', 'verified', 'role:company'])->group(function () {

    Route::prefix('/company')->group(function () {

        Route::get('/', [CompanyController::class, 'index']);
    });
});

// System routes for employee

Route::middleware(['auth', 'verified', 'role:employee'])->group(function () {

    Route::prefix('/employee')->group(function () {

        Route::get('/', [EmployeeController::class, 'index']);
    });
});



require __DIR__.'/auth.php';
