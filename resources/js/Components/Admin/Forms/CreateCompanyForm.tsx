import React, { useEffect, useState } from "react";
import { Input } from "@/Components/ui/input";
import { useForm } from "react-hook-form";
import { router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/Components/ui/use-toast";
import { useGeneralStore } from "@/store/GeneralStore";
import { SheetClose } from "@/Components/ui/sheet";
import { initialValues } from "@/Utils/FormikHelper/CreateCompany";
import { Formik, Form, Field } from "formik";
import FormikField from "@/Components/FormikField";
import { Label } from "@/Components/ui/label";
import PrimaryButton from "@/Components/PrimaryButton";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { BuildingOfficeIcon, PlusIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";

type Props = {
    triggerText: string;
    TriggerIcon?: any;
    triggerClass?: string;
};

function CreateCompanyForm({ triggerText, TriggerIcon, triggerClass }: Props) {
    const form = useForm();

    const { toast } = useToast();

    const { isLoading, setLoading } = useGeneralStore();

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

    function handleCreateSubmit(
        slug: string,
        method: "get" | "post" | "put" | "patch" | "delete",
        onBefore?: string,
        values?: any
    ) {
        setLoading(true);

        router[method](
            slug,
            {
                company_name: values.company_name,
                country: values.country,
                city: values.city,
                postal_code: values.postal_code,
                street: values.street,
                house_number: values.house_number,
                door_bell: values.door_bell,
                email_address: values.email_address,
                phone_number: values.phone_number,
                website: values.website,
                active: values.active,
                ranking: values.ranking,
                comment: values.comment,
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
                        description: "Cég sikeresen létrehozva!",
                    });
                    setLoading(false);
                },

                onError: (resp: any) => {
                    showToast({
                        type: "failed",
                        title: "Hiba!",
                        description: resp.errors,
                    });
                },

                onFinish: () => {
                    setLoading(false);
                    setDialogOpen(false);
                },
            }
        );
    }

    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

    return (
        <>
            <Dialog
                open={isDialogOpen}
                onOpenChange={() => setDialogOpen(!isDialogOpen)}
            >
                <DialogTrigger>
                    <Button className={twMerge(triggerClass)}>
                        <div className="flex flex-row items-center gap-2">
                            {TriggerIcon && <TriggerIcon className="h-4" />}
                            {triggerText && <span>{triggerText}</span>}
                        </div>
                    </Button>
                </DialogTrigger>

                <DialogContent className="h-screen md:h-auto md:min-w-[700px] bg-white overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="mb-8">
                            Cég hozzáadása a rendszerhez
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col justify-center sm:flex-row items-center">
                        <div className="w-1/3">
                            <BuildingOfficeIcon className="h-24 text-gray-400" />
                        </div>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-4 py-4">
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={(values, actions) => {
                                        handleCreateSubmit(
                                            "/company/create",
                                            "post",
                                            undefined,
                                            values
                                        );
                                    }}
                                >
                                    {({ isValid, values }) => (
                                        <Form className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="company_name"
                                                    className="text-right"
                                                >
                                                    Név
                                                </Label>
                                                <FormikField
                                                    id="company_name"
                                                    name="company_name"
                                                    type="text"
                                                    required={false}
                                                    placeholder=""
                                                    readOnly={false}
                                                    className="col-span-3"
                                                />
                                            </div>

                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="email_address"
                                                    className="text-right"
                                                >
                                                    E-mail:
                                                </Label>
                                                <FormikField
                                                    id="email_address"
                                                    name="email_address"
                                                    type="text"
                                                    required={false}
                                                    placeholder=""
                                                    readOnly={false}
                                                    className="col-span-3"
                                                />
                                            </div>

                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="phone_number"
                                                    className="text-right"
                                                >
                                                    Telefonszám:
                                                </Label>
                                                <FormikField
                                                    id="phone_number"
                                                    name="phone_number"
                                                    type="text"
                                                    required={false}
                                                    placeholder=""
                                                    readOnly={false}
                                                    className="col-span-3"
                                                />
                                            </div>

                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="website"
                                                    className="text-right"
                                                >
                                                    Weboldal:
                                                </Label>
                                                <FormikField
                                                    id="website"
                                                    name="website"
                                                    type="text"
                                                    required={false}
                                                    placeholder=""
                                                    readOnly={false}
                                                    className="col-span-3"
                                                />
                                            </div>

                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="country"
                                                    className="text-right"
                                                >
                                                    Ország:
                                                </Label>
                                                <FormikField
                                                    id="country"
                                                    name="country"
                                                    type="text"
                                                    required={false}
                                                    placeholder=""
                                                    readOnly={false}
                                                    className="col-span-3"
                                                />
                                            </div>

                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="city"
                                                    className="text-right"
                                                >
                                                    Város:
                                                </Label>
                                                <FormikField
                                                    id="city"
                                                    name="city"
                                                    type="text"
                                                    required={false}
                                                    placeholder=""
                                                    readOnly={false}
                                                    className="col-span-3"
                                                />
                                            </div>

                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="postal_code"
                                                    className="text-right"
                                                >
                                                    Irányítószám:
                                                </Label>
                                                <FormikField
                                                    id="postal_code"
                                                    name="postal_code"
                                                    type="text"
                                                    required={false}
                                                    placeholder=""
                                                    readOnly={false}
                                                    className="col-span-3"
                                                />
                                            </div>

                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="street"
                                                    className="text-right"
                                                >
                                                    Utca:
                                                </Label>
                                                <FormikField
                                                    id="street"
                                                    name="street"
                                                    type="text"
                                                    required={false}
                                                    placeholder=""
                                                    readOnly={false}
                                                    className="col-span-3"
                                                />
                                            </div>

                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="house_number"
                                                    className="text-right"
                                                >
                                                    Házszám:
                                                </Label>
                                                <FormikField
                                                    id="house_number"
                                                    name="house_number"
                                                    type="text"
                                                    required={false}
                                                    placeholder=""
                                                    readOnly={false}
                                                    className="col-span-3"
                                                />
                                            </div>

                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="door_bell"
                                                    className="text-right"
                                                >
                                                    Ajtó csengő:
                                                </Label>
                                                <FormikField
                                                    id="door_bell"
                                                    name="door_bell"
                                                    type="text"
                                                    required={false}
                                                    placeholder=""
                                                    readOnly={false}
                                                    className="col-span-3"
                                                />
                                            </div>

                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="comment"
                                                    className="text-right"
                                                >
                                                    Megjegyzés:
                                                </Label>
                                                <FormikField
                                                    id="comment"
                                                    name="comment"
                                                    type="text"
                                                    required={false}
                                                    placeholder=""
                                                    readOnly={false}
                                                    as="textarea"
                                                    className="border-gray-50 border-2 p-4 min-h-[100px] hover:cursor-pointer"
                                                />
                                            </div>

                                            <div className="mt-8">
                                                <PrimaryButton
                                                    type="submit"
                                                    className="bg-[#01A2D6] hover:bg-blue-400 text-white"
                                                >
                                                    Mentés
                                                </PrimaryButton>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default CreateCompanyForm;
