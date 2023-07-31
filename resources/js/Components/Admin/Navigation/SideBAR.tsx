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
        <div className="bg-[#343541] text-white h-screen">
            {/* Sidebar teljes */}
            {showSidebar ? (
                <div className="w-[250px] flex flex-col mt-3 text-md">
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
                            <AccordionTrigger className="ml-2 flex justify-start gap-3 hover:no-underline">
                                <BoltIcon className="h-4" />
                                <span>Megrendelések</span>
                            </AccordionTrigger>
                            <AccordionContent>
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
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="border-none">
                            <AccordionTrigger className="ml-2 flex flex-row justify-start gap-3 hover:no-underline">
                                <BuildingOfficeIcon className="h-4" />
                                <span>Céges beállítások</span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <SidebarItem
                                    type="link"
                                    href="/company/all"
                                    text="Rendszerben szereplő cégek"
                                    full
                                />
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="border-none" >
                            <AccordionTrigger className="ml-2 flex flex-row justify-start gap-3 hover:no-underline">
                                <UserIcon className="h-4" />
                                <span>Hozzáférések kezelése</span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <SidebarItem
                                    type="link"
                                    href="/profile/all"
                                    text="Összes hozzáférés"
                                    full
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            ) : (
                // Sidebar nem teljes
                <div className="">
                    <div className="flex flex-col gap-4">
                        <div className="border-b border-gray-400 pb-8">
                            <div>
                                <SidebarItem
                                    type="link"
                                    href="/dashboard"
                                    routeName="dashboard"
                                    Icon={HomeIcon}
                                    text="Dashboard"
                                    full={false}
                                />
                            </div>
                        </div>

                        <div className="border-b border-gray-400 pb-8">
                            <div>
                                <SidebarItem
                                    type="link"
                                    href="#"
                                    routeName=""
                                    Icon={BoltIcon}
                                    text="Aktív árajánlatok"
                                    full={false}
                                />
                            </div>

                            <div>
                                <SidebarItem
                                    type="link"
                                    href="#"
                                    routeName=""
                                    Icon={TableCellsIcon}
                                    text="Összes árajánlat"
                                    full={false}
                                />
                            </div>
                        </div>

                        <div className="border-b border-gray-400 pb-8">
                            <div>
                                <SidebarItem
                                    type="link"
                                    href="/company/all"
                                    routeName=""
                                    Icon={BuildingOfficeIcon}
                                    text="Összes cég"
                                    full={false}
                                />
                            </div>

                            <div>
                                <SidebarItem
                                    type="button"
                                    href="#"
                                    Icon={PlusIcon}
                                    text="Új"
                                    full={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SideBAR;
