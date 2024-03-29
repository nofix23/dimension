import { useState, PropsWithChildren, ReactNode, useEffect } from "react";
import Dropdown from "@/Components/Dropdown";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, router } from "@inertiajs/react";
import { User } from "@/types";
import { BellIcon, Briefcase, Sidebar } from "lucide-react";
import SideBAR from "@/Components/Admin/Navigation/SideBAR";
import { useGeneralStore } from "@/store/GeneralStore";
import { Toaster } from "@/Components/ui/toaster";
import {
    ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import { useToast } from "@/Components/ui/use-toast";

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const generalStore = useGeneralStore();

    const { toast } = useToast();
    type ToastType = {
        type: "success" | "failed";
        title: string;
        description: string;
    };

    const showToast = ({ type, title, description }: ToastType) => {
        if (type === "failed") {
            toast({
                variant: "destructive",
                title: title,
                description: description,
                className: "bg-red-100 text-red-900 font-bold",
            });
        }

        if (type === "success") {
            toast({
                title: title,
                description: description,
                className: "bg-green-100 text-green-900 font-bold text-xl",
            });
        }
    };

    function handleUpdate(
        slug: string,
        method: "get" | "post" | "put" | "patch" | "delete",
        onBefore?: string,
        values?: any
    ) {
        router[method](slug, values, {
            onBefore: () => {
                if (onBefore) {
                    const reply = confirm(onBefore);
                    if (!reply) {
                        // setLoading(false);
                        return false;
                    }
                }
            },

            onSuccess: () => {
                showToast({
                    type: "success",
                    title: "Sikeres művelet!",
                    description: "Borító frissítve!",
                });
            },

            onError: (resp: any) => {
                showToast({
                    type: "failed",
                    title: "Hiba!",
                    description: resp.errors,
                });
            },

            onFinish: () => {},
        });
    }

    return (
        <div className="min-h-screen bg-[#F6F6F6] fixed w-full font-extralight">
            <nav className="bg-white text-black border-b border-slate-100">
                <div className="mx-auto ml-4 mr-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex flex-row items-center gap-4 cursor-pointer mr-8 max-sm:hidden">
                                <ArrowsRightLeftIcon
                                    className="h-6"
                                    onClick={generalStore.setShowSidebar}
                                />
                            </div>

                            <div className="flex items-center justify-center">
                                <Link href="/dashboard">
                                    <div className="border-slate-100 border-2 p-2">
                                        {/* <img
                                            src={Logo}
                                            className="h-20 p-3"
                                        /> */}
                                        <span className="text-xl">
                                            <span className="font-bold">D</span>
                                            imenzió
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-12 gap-8">
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
                                className="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
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
                                Profil
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Kijelentkezés
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>
            <div>
                <div className="flex flex-row">
                    <SideBAR />
                    <div className="w-full mr-2 overflow-y-auto max-h-screen pb-[200px]">
                        {/* <div className="group/header">
                            <div
                                className={`h-[100px] md:h-[150px] ${
                                    user.header_appearance == ""
                                        ? "bg-gradient-to-b from-green-200 to-transparent"
                                        : user.header_appearance
                                } border-b`}
                            >
                                <div className="group/edit invisible group-hover/header:visible group-hover/header:cursor-pointer flex h-full justify-center items-start">
                                    <div className="group-hover/header:text-black">
                                        <div className="bg-white text-blue-900 hover:bg-gray-50 rounded-md mt-2 p-1 text-xs">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <span className="h-5 hover:cursor-pointer">
                                                        Szerkesztés
                                                    </span>
                                                </PopoverTrigger>
                                                <PopoverContent className="min-w-[400px] bg-white rounded-md">
                                                    <div className="p-2 text-xs">
                                                        <span className="p-1 border-b">
                                                            Borító
                                                            megváltoztatása
                                                        </span>

                                                        <div className="p-4 flex flex-wrap gap-2">
                                                            <div
                                                                className="p-12 bg-gradient-to-b from-green-200 to-transparent cursor-pointer"
                                                                onClick={() =>
                                                                    handleUpdate(
                                                                        "/profile/appearance",
                                                                        "post",
                                                                        "",
                                                                        {
                                                                            appearance:
                                                                                "bg-gradient-to-b from-green-200 to-transparent",
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                <div>
                                                                    {user.header_appearance ==
                                                                    "bg-gradient-to-b from-green-200 to-transparent" ? (
                                                                        <CheckIcon className="h-3 absolute" />
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="p-12 bg-gradient-to-b from-blue-200 to-transparent cursor-pointer"
                                                                onClick={() =>
                                                                    handleUpdate(
                                                                        "/profile/appearance",
                                                                        "post",
                                                                        "",
                                                                        {
                                                                            appearance:
                                                                                "bg-gradient-to-b from-blue-200 to-transparent",
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                <div>
                                                                    {user.header_appearance ==
                                                                    "bg-gradient-to-b from-blue-200 to-transparent" ? (
                                                                        <CheckIcon className="h-3 absolute" />
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="p-12 bg-gradient-to-b from-red-200 to-transparent cursor-pointer"
                                                                onClick={() =>
                                                                    handleUpdate(
                                                                        "/profile/appearance",
                                                                        "post",
                                                                        "",
                                                                        {
                                                                            appearance:
                                                                                "bg-gradient-to-b from-red-200 to-transparent",
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                <div>
                                                                    {user.header_appearance ==
                                                                    "bg-gradient-to-b from-red-200 to-transparent" ? (
                                                                        <CheckIcon className="h-3 absolute" />
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="p-12 bg-gradient-to-b from-purple-200 to-transparent cursor-pointer"
                                                                onClick={() =>
                                                                    handleUpdate(
                                                                        "/profile/appearance",
                                                                        "post",
                                                                        "",
                                                                        {
                                                                            appearance:
                                                                                "bg-gradient-to-b from-purple-200 to-transparent",
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                <div>
                                                                    {user.header_appearance ==
                                                                    "bg-gradient-to-b from-purple-200 to-transparent" ? (
                                                                        <CheckIcon className="h-3 absolute" />
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div
                                                                className="p-12 bg-gradient-to-b from-yellow-200 to-transparent cursor-pointer"
                                                                onClick={() =>
                                                                    handleUpdate(
                                                                        "/profile/appearance",
                                                                        "post",
                                                                        "",
                                                                        {
                                                                            appearance:
                                                                                "bg-gradient-to-b from-yellow-200 to-transparent",
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                <div>
                                                                    {user.header_appearance ==
                                                                    "bg-gradient-to-b from-yellow-200 to-transparent" ? (
                                                                        <CheckIcon className="h-3 absolute" />
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div
                                                                className="p-12 bg-gradient-to-b from-gray-200 to-transparent cursor-pointer"
                                                                onClick={() =>
                                                                    handleUpdate(
                                                                        "/profile/appearance",
                                                                        "post",
                                                                        "",
                                                                        {
                                                                            appearance:
                                                                                "bg-gradient-to-b from-gray-200 to-transparent",
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                <div>
                                                                    {user.header_appearance ==
                                                                    "bg-gradient-to-b from-gray-200 to-transparent" ? (
                                                                        <CheckIcon className="h-3 absolute" />
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        <div className="md:ml-12 md:mr-12">
                            {/* {header && (
                                <div>
                                    <span>{header}</span>
                                </div>
                            )} */}

                            <main className="">{children}</main>
                            <Toaster />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
