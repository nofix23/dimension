<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\AuthenticationException;
use Inertia\Inertia;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */

    public function handle(Request $request, Closure $next, $roles)
    {

        $rolesArray = explode('|', $roles);

        if (!in_array(Auth::user()->role, $rolesArray)) {
            $msg = ["error" => "You do not have permission to reach '" . $request->path() . "' url"];
            // return  redirect()->route("dashboard")->with("error", $msg);
            return Inertia::render("Error/NotAuthorized");
        }

        foreach ($rolesArray as $role) {

            if (Auth::user()->role == $role) {
                return $next($request);
            }
        }

        throw new AuthenticationException();

        // return $next($request);
    }
}
