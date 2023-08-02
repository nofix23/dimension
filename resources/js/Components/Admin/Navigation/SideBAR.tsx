import { useGeneralStore } from "@/store/GeneralStore";
import {
    ArrowLeftIcon,
    BoltIcon,
    BuildingOfficeIcon,
    HomeIcon,
    TableCellsIcon,
    UserIcon,
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
        <div className="bg-white h-screen ml-6 border-r pr-2">
            {/* Sidebar teljes */}
            {showSidebar ? (
                <div className="md:w-[250px] flex flex-col mt-3 font-semibold">
                    <div>
                        <SidebarItem
                            type="link"
                            href="/dashboard"
                            routeName="dashboard"
                            Icon={HomeIcon}
                            text="Dashboard"
                            full
                        />
                    </div>

                    <Accordion type="multiple">
                        <AccordionItem value="item-1" className="border-none">
                            <AccordionTrigger className="ml-2 flex justify-start gap-3 hover:no-underline hover:bg-gray-100 hover:cursor-pointer text-xs">
                                <BoltIcon className="h-4" />
                                <span>Megrendelések</span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-2">
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

                        <AccordionItem value="item-2" className="border-none">
                            <AccordionTrigger className="ml-2 flex flex-row justify-start gap-3 hover:no-underline hover:bg-gray-100 hover:cursor-pointer text-xs">
                                <BuildingOfficeIcon className="h-4" />
                                <span>Céges beállítások</span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-2">
                                    <SidebarItem
                                        type="link"
                                        href="/company/all"
                                        text="Összes cég"
                                        full
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="border-none">
                            <AccordionTrigger className="ml-2 flex flex-row justify-start gap-3 hover:no-underline hover:bg-gray-100 hover:cursor-pointer text-xs">
                                <UserIcon className="h-4" />
                                <span>Hozzáférések kezelése</span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-2">
                                    <SidebarItem
                                        type="link"
                                        href="/profile/all"
                                        text="Összes hozzáférés"
                                        full
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default SideBAR;
