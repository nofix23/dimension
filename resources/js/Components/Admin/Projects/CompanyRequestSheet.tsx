import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import { PropsWithChildren } from "react";
import UserDropdown from "../Accounts/UserDropdown";
import { WorkflowIcon } from "lucide-react";
import { QueueListIcon } from "@heroicons/react/24/outline";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { useCustomerRequestStore } from "@/store/CustomerRequestStore";
import { Button } from "@/Components/ui/button";
import { twMerge } from "tailwind-merge";

type Props = {
    side?: "left" | "right" | "top" | "bottom";
    title: string;
};

function CompanyRequestSheet({
    side = "left",
    title,
    children,
}: PropsWithChildren<Props>) {
    const { selectedItem } = useCustomerRequestStore();



    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>{children}</SheetTrigger>
                <SheetContent
                    side={side}
                    className="w-[400px] md:min-w-[800px] bg-white overflow-y-auto"
                >
                    <SheetHeader>
                        <SheetTitle>
                            <div className="flex flex-row items-center gap-5 border-b p-2">
                                <RocketLaunchIcon className="h-10" />
                                <span className="text-3xl font-bold">
                                    {title}
                                </span>
                            </div>
                        </SheetTitle>
                        <SheetDescription>
                            <div className="mb-4 text-lg font-bold">
                                <span>Árajánlat adatai</span>
                            </div>

                            <div className="flex flex-col gap-4 text-left">
                                <div className="flex flex-row items-center gap-3 ml-4">
                                    <div className="w-[200px]">
                                        <span>Név:</span>
                                    </div>
                                    <div className="bg-gray-50 p-2 w-[500px] rounded-xl">
                                        <span className="ml-2">
                                            {selectedItem?.name}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-row items-center gap-3 ml-4">
                                    <div className="w-[200px]">
                                        <span>E-mail:</span>
                                    </div>
                                    <div className="bg-gray-50 p-2 w-[500px] rounded-xl">
                                        <span className="ml-2">
                                            {selectedItem?.email_address}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-row items-center gap-3 ml-4">
                                    <div className="w-[200px]">
                                        <span>Telefonszám:</span>
                                    </div>
                                    <div className="bg-gray-50 p-2 w-[500px] rounded-xl">
                                        <span className="ml-2">
                                            {selectedItem?.phone_number}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-row items-center gap-3 ml-4">
                                    <div className="w-[200px]">
                                        <span>Tárgy:</span>
                                    </div>
                                    <div className="bg-gray-50 p-2 w-[500px] rounded-xl">
                                        <span className="ml-2">
                                            {selectedItem?.subject}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-row items-center gap-3 ml-4">
                                    <div className="w-[200px]">
                                        <span>Anyagok:</span>
                                    </div>
                                    <div className="bg-gray-50 p-2 w-[500px] rounded-xl">
                                        <span className="ml-2">
                                            {selectedItem?.materials}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-3 ml-4">
                                    <div className="w-[200px]">
                                        <span>Megyjezések:</span>
                                    </div>
                                    <div className="bg-gray-50 p-2 w-[500px] rounded-xl">
                                        <span className="ml-2">
                                            {selectedItem?.comments}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-row items-center gap-3 ml-4">
                                    <div className="w-[200px]">
                                        <span>Állapot:</span>
                                    </div>
                                    <div className="bg-gray-50 p-2 w-[500px] rounded-xl">
                                        <span className="ml-2">
                                            {selectedItem?.status == 0 ? (
                                                <span className="text-red-600">
                                                    Még nem feldolgozott
                                                </span>
                                            ) : (
                                                <span>Feldolgozott</span>
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2">
                                    <Button className="bg-green-100 hover:bg-green-200 text-green-900">
                                        Feladat felvétele
                                    </Button>

                                    <Button
                                        className={twMerge(
                                            "bg-[#01A2D6] hover:bg-blue-400 text-white",
                                            selectedItem?.status == 0
                                                ? " opacity-50 cursor-not-allowed"
                                                : ""
                                        )}
                                    >
                                        Árajánlat készítése
                                    </Button>

                                    <Button
                                        className={twMerge(
                                            "bg-red-100 hover:bg-red-200 text-red-900",
                                            selectedItem?.status == 0
                                                ? " opacity-50 cursor-not-allowed"
                                                : ""
                                        )}
                                    >
                                        Kérés elutasítása
                                    </Button>
                                </div>
                            </div>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default CompanyRequestSheet;
