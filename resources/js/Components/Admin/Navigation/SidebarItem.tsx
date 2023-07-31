import { SheetContent } from "@/Components/ui/sheet";
import { Link } from "@inertiajs/react";
import React, { useEffect } from "react";
import CreateCompanyForm from "../Forms/CreateCompanyForm";
import MySheet from "../Sheets/MySheet";

type SidebarItemType = {
    type: "link" | "button";
    href: string;
    routeName?: string;
    Icon?: any;
    text: string;
    full: boolean;
};

function SidebarItem({
    type,
    href,
    routeName,
    Icon,
    text,
    full,
}: SidebarItemType) {


    return (
        <div>
            {full ? (
                <div className="">
                    <div className="">
                        {type === "link" ? (
                            <Link
                                href={href}
                                className={`p-2 flex flex-row items-center gap-4 hover:bg-gray-400 hover:text-gray-900 hover:cursor-pointer
                                ${
                                    routeName && route().current(routeName)
                                        ? "bg-gray-50/20"
                                        : ""
                                }

                            `}
                            >
                                {Icon && <Icon className="h-4" />}
                                <span>{text}</span>
                            </Link>
                        ) : (
                            <div className="p-2 flex flex-row items-center gap-4 hover:bg-gray-400 hover:text-gray-900 hover:cursor-pointer">
                                <div
                                    className={` flex flex-row gap-3
                                ${
                                    routeName && route().current(routeName)
                                        ? "bg-gray-50/20"
                                        : ""
                                }

                            `}
                                >
                                    {Icon && <Icon className="h-4" />}
                                    <MySheet
                                        trigger="Hozzáadás"
                                        side="right"
                                        title="Új cég hozzáadása"
                                    >
                                        <CreateCompanyForm />
                                    </MySheet>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="pt-2">
                    <div className="">
                        {type === "link" ? (
                            <Link
                                href={href}
                                className={`p-1 flex flex-col items-center gap-1 text-xs hover:bg-gray-50 hover:text-black hover:cursor-pointer rounded-xl
                                ${
                                    routeName && route().current(routeName)
                                        ? "bg-gray-50/20"
                                        : ""
                                }

                            `}
                            >
                                {Icon && <Icon className="h-2" />}
                                <span>{text}</span>
                            </Link>
                        ) : (
                            <div className="flex justify-center hover:bg-gray-50 hover:text-black hover:cursor-pointer rounded-xl">
                                <button>
                                    <div
                                        className={`p-1 flex flex-col items-center gap-2 text-xs rounded-xl
                                ${
                                    routeName && route().current(routeName)
                                        ? "bg-gray-50/20"
                                        : ""
                                }

                            `}
                                    >
                                        {Icon && <Icon className="h-3" />}
                                        <span>{text}</span>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SidebarItem;
