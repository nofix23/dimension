import { useState, PropsWithChildren, ReactNode, useEffect } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/Components/ui/navigation-menu";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import { BellIcon, Sidebar } from "lucide-react";
import SideBAR from "@/Components/Admin/Navigation/SideBAR";
import { useGeneralStore } from "@/store/GeneralStore";
import { Toaster } from "@/Components/ui/toaster";
import { ArrowsRightLeftIcon, Bars3Icon, BellAlertIcon, CubeTransparentIcon } from "@heroicons/react/24/outline";

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const generalStore = useGeneralStore();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <nav className="bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
                <div className="mx-auto ml-8 mr-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex flex-row items-center gap-4 cursor-pointer">
                                <ArrowsRightLeftIcon
                                    className="h-6"
                                    onClick={generalStore.setShowSidebar}
                                />
                            </div>

                            <div className="flex flex-row items-center ml-8 text-xl">
                                <div className="bg-gray-200 rounded-2xl p-1">
                                    <Link href="/dashboard">
                                        <CubeTransparentIcon className="h-8" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="hover:cursor-pointer">
                                <BellIcon className="h-5" />
                            </div>
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profil
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Kijelentkezés
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobil nézet */}

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden bg-white"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>
            <div>
                <div className="flex flex-row">
                    <SideBAR />
                    <div className="w-full mr-2">
                        <div className="group/header">
                            <div className="h-[200px] bg-gradient-to-b from-blue-100 to-transparent ">
                                <div className="group/edit invisible group-hover/header:visible group-hover/header:cursor-pointer flex h-full justify-center items-start">
                                    <div className="group-hover/header:text-black">
                                        <div className="bg-white text-blue-900 hover:bg-gray-50 rounded-md mt-2 p-1 text-xs">
                                            <button>Szerkesztés</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" overflow-x-auto">
                            {header && (
                                <div>
                                    <span>{header}</span>
                                </div>
                            )}

                            <main>{children}</main>
                            <Toaster />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
