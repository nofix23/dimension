import { Company, User } from "@/types";
import { router } from "@inertiajs/react";
import { initialValues } from "@/Utils/FormikHelper/UpdateCompany";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { useToast } from "@/Components/ui/use-toast";
import { Field, Form, Formik } from "formik";
import FormikField from "@/Components/FormikField";
import { UserIcon } from "@heroicons/react/24/outline";
import { Button } from "@/Components/ui/button";
import { useCompanyStore } from "@/store/CompanyStore";
import { useEffect, useState } from "react";

type Props = {
    company: Company;
    users: User[];
    user: User;
    triggerText: string;
    TriggerIcon?: any;
};

function UpdateCompanyForm({ company, user, triggerText, TriggerIcon }: Props) {
    const { setUserProfile } = useCompanyStore();
    const { toast } = useToast();

    useEffect(() => {
        setUserProfile(user);
    }, []);

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

    function handleUpdateSubmit(
        slug: string,
        method: "get" | "post" | "put" | "patch" | "delete",
        onBefore?: string,
        values?: any
    ) {
        router[method](
            slug,
            {
                user_id: user?.id ?? null,
                id: user.company?.id,
                company_name: values.company_name,
                email_address: values.email_address,
                phone_number: values.phone_number,
                comment: values.comment,
                active: values.active,
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
            <Dialog
                open={isDialogOpen}
                onOpenChange={() => setDialogOpen(!isDialogOpen)}
            >
                <DialogTrigger asChild>
                    <Button className="ml-4 bg-[#01A2D6] text-white hover:bg-blue-400">
                        <div className="flex flex-row gap-2">
                            {TriggerIcon && <TriggerIcon className="h-4" />}
                            {triggerText && <span>{triggerText}</span>}
                        </div>
                    </Button>
                </DialogTrigger>
                <DialogContent className="md:min-w-[700px] bg-white">
                    <DialogHeader>
                        <DialogTitle>Cég adatainak szerkesztése</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col justify-center sm:flex-row items-center">
                        <div className="w-1/3">
                            <UserIcon className="h-24 text-gray-400" />
                        </div>
                        <div className="grid gap-4 py-4"></div>
                        <Formik
                            initialValues={initialValues(company)}
                            onSubmit={(values, actions) => {
                                handleUpdateSubmit(
                                    "/company/update",
                                    "patch",
                                    undefined,
                                    values
                                );
                            }}
                        >
                            {({ isValid, values }) => (
                                <Form>
                                    <div className="flex flex-col gap-5 text-md">
                                        <div className="flex flex-row gap-8 items-center">
                                            <span>Cég neve:</span>
                                            <FormikField
                                                id="company_name"
                                                name="company_name"
                                                type="text"
                                                required={false}
                                                placeholder=""
                                                readOnly={false}
                                                className="hover:bg-gray-50 min-w-[300px] text-[#01A2D6]"
                                            />
                                        </div>
                                        <div className="flex flex-row gap-8 items-center">
                                            <span>E-mail cím:</span>
                                            <FormikField
                                                id="email_address"
                                                name="email_address"
                                                type="text"
                                                required={false}
                                                placeholder=""
                                                readOnly={false}
                                                className="hover:bg-gray-50 min-w-[300px] text-[#01A2D6]"
                                            />
                                        </div>
                                        <div className="flex flex-row gap-8 items-center">
                                            <span>Telefonszám: </span>
                                            <FormikField
                                                id="phone_number"
                                                name="phone_number"
                                                type="text"
                                                required={false}
                                                placeholder=""
                                                readOnly={false}
                                                className="hover:bg-gray-50 min-w-[300px] text-[#01A2D6]"
                                            />
                                        </div>

                                        <div className="flex flex-row gap-8 items-center">
                                            <span>Aktív: </span>
                                            <Field
                                                id="active"
                                                name="active"
                                                type="text"
                                                required={false}
                                                placeholder=""
                                                readOnly={false}
                                                as="select"
                                                className="p-3 focus:outline-none hover:bg-gray-50 min-w-[100px] text-[#01A2D6]"
                                            >
                                                <option value={1}>
                                                    <div>
                                                        <span>Igen</span>
                                                    </div>
                                                </option>
                                                <option value={0}>
                                                    <div>
                                                        <span>Nem</span>
                                                    </div>
                                                </option>
                                            </Field>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <span>Megjegyzés:</span>

                                            <FormikField
                                                id="comment"
                                                name="comment"
                                                type="text"
                                                required={false}
                                                placeholder=""
                                                readOnly={false}
                                                as="textarea"
                                                className="border-gray-50 border-2 p-4 min-h-[100px] hover:bg-gray-50 text-[#01A2D6]"
                                            />
                                        </div>

                                        <div className="mt-8">
                                            <Button
                                                type="submit"
                                                className="bg-[#01A2D6] hover:bg-blue-400 text-white"
                                            >
                                                Mentés
                                            </Button>
                                        </div>
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

export default UpdateCompanyForm;
