import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { PlusIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { initialValues as initCreateProfileValues } from "@/Utils/FormikHelper/CreateProfile";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { useToast } from "@/Components/ui/use-toast";
import { Label } from "@radix-ui/react-label";
import FormikField from "@/Components/FormikField";
import { DialogClose } from "@radix-ui/react-dialog";
import PrimaryButton from "@/Components/PrimaryButton";

type Props = {
    triggerText: string;
    TriggerIcon?: any;
};

function CreateProfile({ triggerText, TriggerIcon }: Props) {
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
                className: "bg-red-100 text-red-900 font-bold border-none",
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

    function handleCreateSubmit(
        slug: string,
        method: "get" | "post" | "put" | "patch" | "delete",
        onBefore?: string,
        values?: any
    ) {
        router[method](
            slug,
            {
                name: values.name,
                email: values.email,
                password: values.password,
                password_confirmation: values.password_confirmation,
                role: values.role,
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
            }
        );
    }

    const [ isDialogOpen, setDialogOpen ] = useState<boolean>(false);

    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={() => setDialogOpen(!isDialogOpen)}>
                <DialogTrigger asChild>
                    <Button className="">
                        <div className="flex flex-row gap-2">
                            {TriggerIcon && <TriggerIcon className="h-4" />}
                            {triggerText && <span>{triggerText}</span>}
                        </div>
                    </Button>
                </DialogTrigger>
                <DialogContent className="md:min-w-[600px] bg-white">
                    <DialogHeader>
                        <DialogTitle>Hozzáférés létrehozása</DialogTitle>
                        <DialogDescription>
                            Töltsd ki az űrlapot a szükséges adatokkal és
                            kattints a mentés gombra.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col justify-center sm:flex-row items-center">
                        <div className="w-1/2">
                            <UserPlusIcon className="h-24 text-gray-400" />
                        </div>
                        <div className="grid gap-4 py-4">
                            <Formik
                                initialValues={initCreateProfileValues()}
                                onSubmit={(values, actions) => {
                                    handleCreateSubmit(
                                        "/profile/create",
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
                                                htmlFor="name"
                                                className="text-right"
                                            >
                                                Név
                                            </Label>
                                            <FormikField
                                                id="name"
                                                name="name"
                                                type="text"
                                                required={true}
                                                placeholder=""
                                                readOnly={false}
                                                className="col-span-3"
                                            />
                                        </div>

                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="email"
                                                className="text-right"
                                            >
                                                E-mail
                                            </Label>
                                            <FormikField
                                                id="email"
                                                name="email"
                                                type="text"
                                                required={true}
                                                placeholder=""
                                                readOnly={false}
                                                className="col-span-3"
                                            />
                                        </div>

                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="password"
                                                className="text-right"
                                            >
                                                Jelszó
                                            </Label>
                                            <FormikField
                                                id="password"
                                                name="password"
                                                type="password"
                                                required={true}
                                                placeholder=""
                                                readOnly={false}
                                                className="col-span-3"
                                            />
                                        </div>

                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="password_confirmation"
                                                className="text-right"
                                            >
                                                Jelszó megerősítése
                                            </Label>
                                            <FormikField
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                type="password"
                                                required={true}
                                                placeholder=""
                                                readOnly={false}
                                                className="col-span-3"
                                            />
                                        </div>

                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="role"
                                                className="text-right"
                                            >
                                                Jogosultság
                                            </Label>
                                            <Field
                                                id="role"
                                                name="role"
                                                type="text"
                                                required={true}
                                                placeholder=""
                                                readOnly={false}
                                                as="select"
                                                className="col-span-3"
                                            >
                                                <option value="employee">
                                                    Alkalmazott
                                                </option>
                                                <option value="company">
                                                    Cég
                                                </option>
                                                <option value="customer">
                                                    Vásárló
                                                </option>
                                                <option value="admin">
                                                    Admin
                                                </option>
                                            </Field>
                                        </div>

                                        <div className="flex justify-center mt-5">
                                            <Button
                                                type="submit"
                                                className="bg-[#01A2D6] hover:bg-blue-400 text-white"
                                            >
                                                Hozzáférés létrehozása
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateProfile;
