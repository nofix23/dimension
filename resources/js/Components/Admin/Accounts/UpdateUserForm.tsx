import FormikField from "@/Components/FormikField";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { useToast } from "@/Components/ui/use-toast";
import { initialValues as initUpdateProfileValues } from "@/Utils/FormikHelper/UpdateProfile";
import { User } from "@/types";
import { router } from "@inertiajs/react";
import { Field, Form, Formik } from "formik";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { UserIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";

type Props = {
    user: User;
    triggerText: string;
    TriggerIcon?: any;
};

function UpdateUserForm({ user, triggerText, TriggerIcon }: Props) {
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

    function handleUpdateProfileSubmit(
        slug: string,
        method: "get" | "post" | "put" | "patch" | "delete",
        onBefore?: string,
        values?: any
    ) {
        router[method](
            slug,
            {
                id: values.id,
                name: values.name,
                email: values.email,
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

    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

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
                <DialogContent className="md:min-w-[700px] bg-white">
                    <DialogHeader>
                        <DialogTitle>Hozzáférés szerkesztése</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col justify-center sm:flex-row items-center">
                        <div className="w-1/3">
                            <UserIcon className="h-24 text-gray-400" />
                        </div>
                        <div className="grid gap-4 py-4"></div>
                        <Formik
                            initialValues={initUpdateProfileValues(user)}
                            onSubmit={(values, actions) => {
                                handleUpdateProfileSubmit(
                                    "/profile/update",
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
                                            <option value="company">Cég</option>
                                            <option value="customer">
                                                Vásárló
                                            </option>
                                            <option value="admin">Admin</option>
                                        </Field>
                                    </div>
                                    <div className="flex justify-center mt-5">
                                        <Button className="bg-[#01A2D6] hover:bg-blue-400 text-white">
                                            Változtatások mentése
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default UpdateUserForm;
