import { useGeneralStore } from "@/store/GeneralStore";
import {
    ArrowLeftIcon,
    BoltIcon,
    BuildingOfficeIcon,
    HomeIcon,
    TableCellsIcon,
    UserIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import SidebarItem from "./SidebarItem";
import { PlusIcon, User2Icon } from "lucide-react";
import AddCompanySheet from "../Sheets/MySheet";
import { useEffect } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";

function SideBAR() {
    const { showSidebar } = useGeneralStore();

    return (
        <div>
            <div className="bg-white h-screen border-r pr-2 max-sm:hidden text-gray-700">
                {/* Sidebar teljes */}
                {showSidebar ? (
                    <div className="md:w-[250px] ml-4 flex flex-col mt-3 font-semibold">
                        <div className="">
                            <SidebarItem
                                type="link"
                                href="/dashboard"
                                routeName="dashboard"
                                Icon={HomeIcon}
                                text="Vezérlőpult"
                                full
                            />
                        </div>

                        <Accordion
                            type="multiple"
                            defaultValue={["item-1", "item-2", "item-3"]}
                        >
                            <AccordionItem
                                value="item-1"
                                className="border-none"
                            >
                                <div className="flex flex-row items-center hover:bg-gray-100 hover:cursor-pointer">
                                    <BoltIcon className="h-6" />
                                    <AccordionTrigger className="ml-2 flex justify-start gap-3 hover:no-underline text-md">
                                        <span>Megrendelések</span>
                                    </AccordionTrigger>
                                </div>

                                <AccordionContent>
                                    <div className="flex flex-col gap-2 ml-6">
                                        <SidebarItem
                                            type="link"
                                            href="#"
                                            text="Aktív árajánlatok"
                                            full
                                        />
                                        <SidebarItem
                                            type="link"
                                            href="#"
                                            text="Összes árajánlat"
                                            full
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem
                                value="item-2"
                                className="border-none"
                            >
                                <div className="flex flex-row items-center hover:bg-gray-100 hover:cursor-pointer">
                                    <BuildingOfficeIcon className="h-6" />{" "}
                                    <AccordionTrigger className="ml-2 flex justify-start gap-3 hover:no-underline text-md">
                                        <span>Céges beállítások</span>{" "}
                                    </AccordionTrigger>
                                </div>

                                <AccordionContent>
                                    <div className="flex flex-col gap-2 ml-6">
                                        <SidebarItem
                                            type="link"
                                            href="/company/all"
                                            text="Cégek"
                                            full
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem
                                value="item-3"
                                className="border-none"
                            >
                                <div className="flex flex-row items-center hover:bg-gray-100 hover:cursor-pointer">
                                    <UserIcon className="h-6" />{" "}
                                    <AccordionTrigger className="ml-2 flex justify-start gap-3 hover:no-underline text-md">
                                        <span>Hozzáférések kezelése</span>
                                    </AccordionTrigger>
                                </div>

                                <AccordionContent>
                                    <div className="flex flex-col gap-2 ml-6">
                                        <SidebarItem
                                            type="link"
                                            href="/profile/all"
                                            text="Hozzáférések"
                                            full
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                ) : (
                    <div className="flex flex-col ml-4 gap-8 mt-8 font-semibold">
                        <div className="cursor-pointer group/item flex flex-row">
                            <Link href="/dashboard">
                                <HomeIcon className="h-6" />
                            </Link>

                            <div className="group/edit invisible group-hover/item:visible absolute left-20">
                                <span className="group-hover/edit:text-gray-700 ">
                                    Vezérlőpult
                                </span>
                            </div>
                        </div>
                        <div className="cursor-pointer group/item flex flex-row">
                            <Link href="/company/all">
                                <BuildingOfficeIcon className="h-6" />
                            </Link>
                            <div className="group/edit invisible group-hover/item:visible absolute left-20">
                                <span className="group-hover/edit:text-gray-700 ">
                                    Cégek
                                </span>
                            </div>
                        </div>

                        <div className="cursor-pointer group/item flex flex-row">
                            <Link href="/profile/all">
                                <UsersIcon className="h-6" />
                            </Link>
                            <div className="group/edit invisible group-hover/item:visible absolute left-20">
                                <span className="group-hover/edit:text-gray-700 ">
                                    Hozzáférések
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="fixed bottom-0 sm:hidden bg-black text-white w-full">
                <div className="flex flex-row gap-12 m-4">
                    <Link href="/dashboard">
                        <HomeIcon className="h-8" />
                    </Link>
                    <Link href="/company/all">
                        <BuildingOfficeIcon className="h-8" />
                    </Link>
                    <Link href="/profile/all">
                        <UsersIcon className="h-8" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SideBAR;
