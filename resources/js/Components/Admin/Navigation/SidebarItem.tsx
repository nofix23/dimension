import { SheetContent } from "@/Components/ui/sheet";
import { Link } from "@inertiajs/react";
import React, { useEffect } from "react";
import CreateCompanyForm from "../Forms/CreateCompanyForm";
import MySheet from "../Sheets/MySheet";
import { twMerge } from "tailwind-merge";

type SidebarItemType = {
    type: "link" | "button";
    href: string;
    routeName?: string;
    Icon?: any;
    text: string;
    full: boolean;
    className?: string;
};

function SidebarItem({
    type,
    href,
    routeName,
    Icon,
    text,
    full,
    className
}: SidebarItemType) {


    return (
        <div>
            {full ? (
                <div className="">
                    <div className="">
                        {type === "link" ? (
                            <Link
                                href={href}
                                className={twMerge(`flex flex-row items-center text-sm gap-4 hover:bg-gray-100 duration-100 transition-all hover:text-gray-900 hover:cursor-pointer
                                ${
                                    routeName && route().current(routeName)
                                        ? "bg-gray-50/20"
                                        : ""
                                }

                            `, className)}
                            >
                                <div className="flex flex-row justify-center items-center gap-3 h-[45px]">
                                    {Icon && <Icon className="h-5" />}
                                    <span>{text}</span>
                                </div>
                            </Link>
                        ) : (
                            <div className="p-2 flex flex-row items-center gap-4 hover:bg-gray-100 hover:text-gray-900 hover:cursor-pointer">
                                <div
                                    className={twMerge(`flex flex-row gap-3
                                ${
                                    routeName && route().current(routeName)
                                        ? "bg-gray-50/20"
                                        : ""
                                }

                            `, className)}
                                >
                                    {Icon && <Icon className="h-4" />}
                                    <MySheet
                                        trigger="Hozzáadás"
                                        side="right"
                                        title="Új cég hozzáadása"
                                    >
                                        <CreateCompanyForm triggerText="" triggerClass=""/>
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
