import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import React, { PropsWithChildren, useState } from "react";
import CompanyData from "../Accounts/CompanyData";
import { useForm } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { PlusIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import Input from "@/Components/Share/Input";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import { useToast } from "@/Components/ui/use-toast";


function CreateCompanyContactForm({ children }: PropsWithChildren) {
    const { data, setData, post, processing, errors } = useForm({
        company_id: 1,
        name: "",
        phone_number: "",
        email_address: "",
        type: "",
    });

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

    const handleSubmit = (e: any) => {
        e.preventDefault();
        post("/company/contact/create", {
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

            onFinish: () => {
                setDialogOpen(false);
            },
        });
    };

    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

    return (
        <div className="mt-12">
            <Accordion type="multiple" defaultValue={["item-2"]}>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="max-w-[100px]">
                        <div>Kapcsolattartók</div>
                    </AccordionTrigger>
                    <AccordionContent>
                        {children}
                        <Dialog
                            open={isDialogOpen}
                            onOpenChange={() => setDialogOpen(!isDialogOpen)}
                        >
                            <DialogTrigger>
                                <Button className="bg-[#01A2D6] text-white hover:bg-blue-400 border-slate-300">
                                    <div className="flex flex-row justify-center items-center">
                                        <PlusIcon className="h-4" />
                                        <span>Hozzáadás</span>
                                    </div>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="md:min-w-[700px] bg-white">
                                <DialogHeader>
                                    <DialogTitle className="h-16 text-left">
                                        Kapcsolattartó hozzáadása
                                    </DialogTitle>
                                    <DialogDescription></DialogDescription>
                                </DialogHeader>
                                <div className="flex justify-center flex-wrap sm:flex-row items-center gap-4">
                                    <div className="w-1/3">
                                        <UserPlusIcon className="h-24 text-gray-400" />
                                    </div>
                                    <form onSubmit={handleSubmit} className="">
                                        <div className="flex flex-col gap-3 items-center justify-center">
                                            <div className="flex flex-row items-center gap-4">
                                                <InputLabel
                                                    htmlFor="name"
                                                    value="Név"
                                                    className="w-[80px]"
                                                />
                                                <Input
                                                    className=""
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.name && (
                                                    <div>{errors.name}</div>
                                                )}
                                            </div>

                                            <div className="flex flex-row items-center gap-4">
                                                <InputLabel
                                                    htmlFor="name"
                                                    value="Telefonszám"
                                                    className="w-[80px]"
                                                />
                                                <Input
                                                    type="text"
                                                    value={data.phone_number}
                                                    onChange={(e) =>
                                                        setData(
                                                            "phone_number",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.phone_number && (
                                                    <div>
                                                        {errors.phone_number}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex flex-row items-center gap-4">
                                                <InputLabel
                                                    htmlFor="email_address"
                                                    value="E-mail"
                                                    className="w-[80px]"
                                                />
                                                <Input
                                                    type="email"
                                                    value={data.email_address}
                                                    onChange={(e) =>
                                                        setData(
                                                            "email_address",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.phone_number && (
                                                    <div>
                                                        {errors.phone_number}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-row items-center gap-4 w-full">
                                                <InputLabel
                                                    htmlFor="type"
                                                    value="Típus"
                                                    className="w-[80px]"
                                                />
                                                <select
                                                    name="type"
                                                    id="type"
                                                    onChange={(e) =>
                                                        setData(
                                                            "type",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option selected>
                                                        - Válassz -
                                                    </option>
                                                    <option value="responsible">
                                                        Felelős
                                                    </option>
                                                    <option
                                                        value="deputy"
                                                    >
                                                        Helyettes
                                                    </option>
                                                </select>
                                                {errors.type && (
                                                    <div>{errors.type}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-8 flex justify-center">
                                            <PrimaryButton
                                                className="bg-[#01A2D6] text-white hover:bg-blue-400 border-slate-300"
                                                disabled={processing}
                                            >
                                                Létrehozás
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default CreateCompanyContactForm;
