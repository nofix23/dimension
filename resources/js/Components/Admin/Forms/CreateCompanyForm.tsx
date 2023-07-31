import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

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

function CreateCompanyForm() {
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
                className: "bg-red-500 text-white font-bold",
            });
        }

        if (type === "success") {
            toast({
                title: title,
                description: description,
                className: "bg-green-500 text-white font-bold text-xl",
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
                active: values.active,
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
                },
            }
        );
    }

    return (
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
                            <Label htmlFor="country" className="text-right">
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
                            <Label htmlFor="city" className="text-right">
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
                            <Label htmlFor="postal_code" className="text-right">
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
                            <Label htmlFor="street" className="text-right">
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
                            <Label htmlFor="door_bell" className="text-right">
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
                            <Label htmlFor="comment" className="text-right">
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
                            <Button
                                type="submit"
                                className="bg-green-100 hover:bg-green-200 text-green-900"
                            >
                                Mentés
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CreateCompanyForm;
