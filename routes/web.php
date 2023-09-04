<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectsController;
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


Route::get('/', [IndexController::class, 'index']);

Route::post('/customer/request', [IndexController::class, 'handleCustomerRequest']);





// System routes for admin

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {

    Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');

    Route::prefix('/user')->group(function () {

        Route::post('/delete', [AdminController::class, 'deleteUser']);
    });

    Route::prefix('/projects')->group(function () {

        Route::get('/', [ProjectsController::class, 'getProjects']);

        Route::get('/unacknowledge', [ProjectsController::class, 'getActiveRequests']);

        Route::post('/customer-request/acknowledge', [ProjectsController::class, 'acknowledgeCustomerRequest']);

        Route::post('/customer-request/reject', [ProjectsController::class, 'rejectCustomerRequest']);


    });



    // Routes for company

    Route::prefix('/company')->group(function () {

        Route::post('/create', [AdminController::class, 'addCompany']);

        Route::get('/all', [AdminController::class, 'getCompanies']);

        Route::patch('/update', [AdminController::class, 'updateCompany']);

        Route::post('/delete', [AdminController::class, 'deleteCompany']);

        Route::prefix('/contact')->group(function () {

            Route::post('/create', [AdminController::class, 'addContact']);

            Route::post('/update', [AdminController::class, 'updateContact']);

            Route::post('/delete', [AdminController::class, 'deleteContact']);
        });
    });

    Route::prefix('/profile')->group(function () {

        Route::post('/create', [AdminController::class, 'createProfile']);

        Route::post('/update', [AdminController::class, 'updateProfile']);

        Route::get('/all', [AdminController::class, 'getProfiles']);

        Route::post('/appearance', [AdminController::class, 'setAppearance']);
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



require __DIR__ . '/auth.php';
