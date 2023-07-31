import { useGeneralStore } from "@/store/GeneralStore";
import {
    ArrowLeftIcon,
    BoltIcon,
    BuildingOfficeIcon,
    HomeIcon,
    TableCellsIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import SidebarItem from "./SidebarItem";
import { PlusIcon } from "lucide-react";
import AddCompanySheet from "../Sheets/MySheet";
import { useEffect } from "react";

function SideBAR() {
    const { showSidebar } = useGeneralStore();

    return (
        <div className="bg-[#343541] text-white h-screen">
            {/* Sidebar teljes */}
            {showSidebar ? (
                <div className="w-[250px] flex flex-col mt-3 text-xs">
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

                    <div>
                        <div className="pl-4 mt-8">
                            <span className="text-md">Megrendelések</span>
                        </div>
                        <SidebarItem
                            type="link"
                            href="#"
                            Icon={BoltIcon}
                            text="Aktív árajánlatok"
                            full
                        />
                        <SidebarItem
                            type="link"
                            href="#"
                            Icon={TableCellsIcon}
                            text="Összes árajánlat"
                            full
                        />
                    </div>

                    <div>
                        <div className="pl-4 mt-8">
                            <span className="text-md">Cégek</span>
                        </div>
                        <SidebarItem
                            type="link"
                            href="/company/all"
                            Icon={BuildingOfficeIcon}
                            text="Összes cég"
                            full
                        />

                        <SidebarItem
                            type="button"
                            href="#"
                            Icon={PlusIcon}
                            text="Új"
                            full
                        />
                    </div>
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
