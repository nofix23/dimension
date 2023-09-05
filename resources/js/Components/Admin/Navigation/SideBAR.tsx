import { useGeneralStore } from "@/store/GeneralStore";
import {
    ArrowLeftCircleIcon,
    ArrowLeftIcon,
    BoltIcon,
    BuildingOfficeIcon,
    Cog6ToothIcon,
    HomeIcon,
    TableCellsIcon,
    TruckIcon,
    UserIcon,
    UserPlusIcon,
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
        <div className="bg-white border-r border-slate-100">
            <div className="bg-white h-screen pr-2 max-sm:hidden text-black">
                {/* Sidebar teljes */}
                {showSidebar ? (
                    <div className="md:w-[200px] flex flex-col gap-4 mt-3 font-semibold">
                        <div className="">
                            <SidebarItem
                                type="link"
                                href="/dashboard"
                                routeName="dashboard"
                                Icon={HomeIcon}
                                text="Irányítópult"
                                full
                                className="pl-3"
                            />
                        </div>

                        <Accordion
                            type="multiple"
                            defaultValue={["item-1", "item-2"]}
                            className="flex flex-col gap-4"
                        >
                            <AccordionItem
                                value="item-1"
                                className="border-none"
                            >
                                <div className="flex flex-row items-center hover:bg-gray-100 hover:text-gray-900 cursor-pointer pl-3">
                                    <BoltIcon className="h-5" />
                                    <AccordionTrigger className="ml-2 flex justify-start gap-3 hover:no-underline text-sm">
                                        <span>Megrendelések</span>
                                    </AccordionTrigger>
                                </div>

                                <AccordionContent>
                                    <div className="flex flex-col gap-2 ml-6">
                                        <SidebarItem
                                            type="link"
                                            href="/projects/unacknowledge"
                                            text="Megrendelői árajánlatok"
                                            full
                                            className="pl-3"
                                        />
                                        <SidebarItem
                                            type="link"
                                            href="/projects"
                                            text="Összes"
                                            full
                                            className="pl-3"
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem
                                value="item-2"
                                className="border-none"
                            >
                                <div className="flex flex-row items-center hover:bg-gray-100 hover:text-gray-900 hover:cursor-pointer pl-3">
                                    <BuildingOfficeIcon className="h-5" />{" "}
                                    <AccordionTrigger className="ml-2 flex justify-start gap-3 hover:no-underline text-sm">
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
                                            className="pl-3"
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <div className="">
                            <SidebarItem
                                type="link"
                                href="/profile/all"
                                text="Hozzáférések"
                                Icon={UsersIcon}
                                full
                                className="pl-3"
                            />
                        </div>

                        <div className="">
                            <SidebarItem
                                type="link"
                                href="#"
                                routeName="dashboard"
                                Icon={Cog6ToothIcon}
                                text="Beállítások"
                                full
                                className="pl-3"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col ml-2 gap-8 mt-8 font-semibold">
                        <div className="cursor-pointer group/item flex flex-row">
                            <Link href="/dashboard">
                                <HomeIcon className="h-6" />
                            </Link>

                            <div className="group/edit invisible group-hover/item:visible absolute z-50 left-20 bg-white text-black p-3 rounded-xl min-w-[200px] border-2">
                                <span className="group-hover/edit:text-gray-700 flex flex-row gap-2 items-center">
                                    <ArrowLeftIcon className="h-4" />
                                    Irányítópult
                                </span>
                            </div>
                        </div>

                        <div className="cursor-pointer group/item flex flex-row">
                            <Link href="/projects/unacknowledge">
                                <BoltIcon className="h-6" />
                            </Link>
                            <div className="group/edit invisible group-hover/item:visible absolute z-50 left-20 bg-white text-black p-3 rounded-xl min-w-[200px] border-2">
                                <span className="group-hover/edit:text-gray-700 flex flex-row gap-2 items-center">
                                    <ArrowLeftIcon className="h-4" />
                                    Megrendelői árajánlatok
                                </span>
                            </div>
                        </div>
                        <div className="cursor-pointer group/item flex flex-row">
                            <Link href="/projects">
                                <TruckIcon className="h-6" />
                            </Link>
                            <div className="group/edit invisible group-hover/item:visible absolute z-50 left-20 bg-white text-black p-3 rounded-xl min-w-[200px] border-2">
                                <span className="group-hover/edit:text-gray-700 flex flex-row gap-2 items-center">
                                    <ArrowLeftIcon className="h-4" />
                                    Megrendelések
                                </span>
                            </div>
                        </div>

                        <div className="cursor-pointer group/item flex flex-row">
                            <Link href="/company/all">
                                <BuildingOfficeIcon className="h-6" />
                            </Link>
                            <div className="group/edit invisible group-hover/item:visible absolute z-50 left-20 bg-white text-black p-3 rounded-xl min-w-[200px] border-2">
                                <span className="group-hover/edit:text-gray-700 flex flex-row gap-2 items-center">
                                    <ArrowLeftIcon className="h-4" />
                                    Cégek
                                </span>
                            </div>
                        </div>

                        <div className="cursor-pointer group/item flex flex-row">
                            <Link href="/profile/all">
                                <UsersIcon className="h-6" />
                            </Link>
                            <div className="group/edit invisible group-hover/item:visible absolute z-50 left-20 bg-white text-black p-3 rounded-xl min-w-[200px] border-2">
                                <span className="group-hover/edit:text-gray-700 flex flex-row gap-2 items-center">
                                    <ArrowLeftIcon className="h-4" />
                                    Hozzáférések
                                </span>
                            </div>
                        </div>

                        <div className="cursor-pointer group/item flex flex-row">
                            <Link href="#">
                                <Cog6ToothIcon className="h-6" />
                            </Link>
                            <div className="group/edit invisible group-hover/item:visible absolute z-50 left-20 bg-white text-black p-3 rounded-xl min-w-[200px] border-2">
                                <span className="group-hover/edit:text-gray-700 flex flex-row gap-2 items-center">
                                    <ArrowLeftIcon className="h-4" />
                                    Beállítások
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="fixed bottom-0 sm:hidden z-50 bg-white text-black w-full mt-[200px] border-t border-2">
                <div className="flex flex-row justify-between gap-6 m-4">
                    <Link href="/dashboard">
                        <HomeIcon className="h-6" />
                    </Link>
                    <Link href="/projects/unacknowledge">
                        <BoltIcon className="h-6" />
                    </Link>
                    <Link href="/projects">
                        <TruckIcon className="h-6" />
                    </Link>
                    <Link href="/company/all">
                        <BuildingOfficeIcon className="h-6" />
                    </Link>
                    <Link href="/profile/all">
                        <UsersIcon className="h-6" />
                    </Link>
                    <Link href="#">
                        <Cog6ToothIcon className="h-6" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SideBAR;
