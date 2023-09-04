import { Button } from "@/Components/ui/button";
import { useToast } from "@/Components/ui/use-toast";
import { CompanyContact } from "@/types";
import { UserIcon } from "@heroicons/react/24/outline";
import { router } from "@inertiajs/react";
import React from "react";

type Props = {
    contacts: CompanyContact[];
};

function Contacts({ contacts }: Props) {
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

    function handleDeleteContactSubmit(value: number, onBefore?: string) {
        router.post(
            "/company/contact/delete",
            { id: value },
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
                        description: "Adatok frissítve!",
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
            {contacts.length > 0 ? (
                <div className="flex flex-wrap gap-2 sm:gap-5 pt-8 pb-8">
                    {contacts?.map((contact: CompanyContact) => (
                        <div className="flex flex-col gap-3 border-2 border-slate-100 max-w-sm p-3 w-full sm:w-auto">
                            <div className="flex flex-col p-2">
                                <div className="flex flex-col gap-3 sm:min-h-[150px] items-center justify-center">
                                    {contact.image_url ? (
                                        <img
                                            src={`/images/${contact.image_url}`}
                                            className="w-auto sm:w-32"
                                        />
                                    ) : (
                                        <UserIcon className="h-24" />
                                    )}
                                </div>
                                <div className="flex flex-col items-start gap-4 mt-2">
                                    <div className="flex flex-row gap-1">
                                        <span className="font-bold">Név:</span>
                                        <span className="">{contact.name}</span>
                                    </div>
                                    <div className="flex flex-row gap-1">
                                        <span className="font-bold">
                                            Beosztás:
                                        </span>
                                        <span className="">
                                            {contact.type === "responsible"
                                                ? "Felelős"
                                                : "Helyettes"}
                                        </span>
                                    </div>
                                    <div className="flex flex-row gap-1">
                                        <span className="font-bold">
                                            E-mail:
                                        </span>
                                        <span>{contact.email_address}</span>
                                    </div>
                                    <div className="flex flex-row gap-1">
                                        <span className="font-bold">
                                            Telefonszám:
                                        </span>
                                        <span>{contact.phone_number}</span>
                                    </div>
                                    <div className="flex flex-row gap-1">
                                        <span className="font-bold">
                                            Másodlagos telefonszám:
                                        </span>
                                        <span>
                                            {contact.secondary_phone_number}
                                        </span>
                                    </div>
                                    <Button
                                        className="bg-red-100 hover:bg-red-200 text-red-900 text-xs"
                                        onClick={() =>
                                            handleDeleteContactSubmit(
                                                contact.id,
                                                "Biztosan törlöd?"
                                            )
                                        }
                                    >
                                        Törlés
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="h-12 pt-8 pb-8 mb-4 flex items-center bg-red-100 text-red-900">
                    <span className="p-4">Nincs kapcsolattartó beállítva!</span>
                </div>
            )}
        </div>
    );
}

export default Contacts;
