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
import { useToast } from "@/Components/ui/use-toast";
import { router, usePage } from "@inertiajs/react";
import { User } from "@/types";

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

    const { toast } = useToast();

    const { auth }: any = usePage().props;

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
                className: "bg-red-100 text-red-900 font-bold border-none",
            });
        }

        if (type === "success") {
            toast({
                title: title,
                description: description,
                className:
                    "bg-green-100 text-green-900 font-bold text-xl border-none",
            });
        }
    };

    function handleAcceptSubmit(onBefore?: string) {
        router.post(
            "/projects/customer-request/acknowledge",
            {
                user_id: auth.user.id,
                user_name: auth.user.name,
                customer_request: selectedItem,
            },
            {
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
                        description: "Feladat felvéve",
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
            }
        );
    }

    function handleRevertAcceptSubmit(onBefore?: string) {
        router.post(
            "/projects/customer-request/revert-accept",
            {
                user_id: auth.user.id,
                user_name: auth.user.name,
                customer_request: selectedItem,
            },
            {
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
                        description: "Feladat felvéve",
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
            }
        );
    }

    function handleRejectSubmit(onBefore?: string) {
        router.post(
            "/projects/customer-request/reject",
            {
                user_id: auth.user.id,
                user_name: auth.user.name,
                customer_request: selectedItem,
            },
            {
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
                        description: "Feladat felvéve",
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
            }
        );
    }

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
                                        <span>Feladat ügyintézője:</span>
                                    </div>
                                    <div className="bg-gray-50 p-2 w-[500px] rounded-xl">
                                        <span className="ml-2">
                                            {selectedItem?.accepted_by}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-row items-center gap-3 ml-4">
                                    <div className="w-[200px]">
                                        <span>
                                            Feladat felvételének dátuma:
                                        </span>
                                    </div>
                                    <div className="bg-gray-50 p-2 w-[500px] rounded-xl">
                                        <span className="ml-2">
                                            {selectedItem?.accepted_at}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-row items-center gap-3 ml-4">
                                    <div className="w-[200px]">
                                        <span>Feladatot leadta:</span>
                                    </div>
                                    <div className="bg-gray-50 p-2 w-[500px] rounded-xl">
                                        <span className="ml-2">
                                            {selectedItem?.reverted_by}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-row items-center gap-3 ml-4">
                                    <div className="w-[200px]">
                                        <span>Feladat leadásának dátuma:</span>
                                    </div>
                                    <div className="bg-gray-50 p-2 w-[500px] rounded-xl">
                                        <span className="ml-2">
                                            {selectedItem?.reverted_at}
                                        </span>
                                    </div>
                                </div>
                                <hr></hr>

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
                                    <Button
                                        className={twMerge(
                                            "bg-green-100 hover:bg-green-200 text-green-900"
                                        )}
                                        onClick={() => handleAcceptSubmit()}
                                        disabled={
                                            selectedItem?.accept == 1
                                                ? true
                                                : false
                                        }
                                    >
                                        Feladat felvétele
                                    </Button>

                                    <Button
                                        className={twMerge(
                                            "bg-orange-100 hover:bg-orange-200 text-orange-900"
                                        )}
                                        onClick={() =>
                                            handleRevertAcceptSubmit()
                                        }
                                        disabled={
                                            selectedItem?.accept == 1
                                                ? false
                                                : true
                                        }
                                    >
                                        Feladat leadása
                                    </Button>

                                    <Button
                                        className={twMerge(
                                            "bg-[#01A2D6] hover:bg-blue-400 text-white"
                                        )}
                                        disabled={
                                            selectedItem?.accept == 0 ||
                                            selectedItem?.status === -1
                                                ? true
                                                : false
                                        }
                                    >
                                        Árajánlat készítése
                                    </Button>

                                    <Button
                                        className={twMerge(
                                            "bg-red-100 hover:bg-red-200 text-red-900"
                                        )}
                                        onClick={() => handleRejectSubmit()}
                                        disabled={
                                            selectedItem?.accept == 0 ||
                                            selectedItem?.status === -1
                                                ? true
                                                : false
                                        }
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
