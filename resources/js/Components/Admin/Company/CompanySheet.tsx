import { Head, router } from "@inertiajs/react";
import { Company, PageProps, User } from "@/types";
import { PropsWithChildren, useEffect, useState } from "react";
import { useCompanyStore } from "@/store/CompanyStore";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { Button } from "@/Components/ui/button";

import {
    CheckIcon,
    PlusIcon,
    TrashIcon,
    UserCircleIcon,
    UserIcon,
} from "lucide-react";
import {
    BuildingOffice2Icon,
    EllipsisHorizontalIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { ArrowDownIcon } from "@radix-ui/react-icons";

import { Field, Form, Formik } from "formik";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { useForm } from "react-hook-form";
import { useToast } from "@/Components/ui/use-toast";
import { initialValues } from "@/Utils/FormikHelper/UpdateCompany";
import { initialValues as initCreateProfileValues } from "@/Utils/FormikHelper/CreateProfile";
import { initialValues as initUpdateProfileValues } from "@/Utils/FormikHelper/UpdateProfile";

import FormikField from "@/Components/FormikField";
import { Label } from "@/Components/ui/label";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import { Checkbox } from "@/Components/ui/checkbox";
import CreateProfile from "@/Components/Admin/Forms/CreateProfile";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import { Toaster } from "@/Components/ui/toaster";
import CreateCompanyContactForm from "../Forms/CreateCompanyContactForm";
import Contacts from "./Contacts";
import CompanyData from "../Accounts/CompanyData";

type Props = {
    side: "left" | "right" | "top" | "bottom";
    company: Company;
    users: User[];
    user: User;
};
function CompanySheet({
    side,
    company,
    users,
    user,
    children,
}: PropsWithChildren<Props>) {
    const { userProfile, setUserProfile, setSelectedItem } = useCompanyStore();

    const { toast } = useToast();

    useEffect(() => {
        setUserProfile(company.user);
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
                user_id: userProfile?.id ?? null,
                id: company?.id,
                company_name: values.company_name,
                email_address: values.email_address,
                phone_number: values.phone_number,
                website: values.website,
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
                    setShowSheet(false);
                },
            }
        );
    }

    function handleDeleteCompanySubmit(
        slug: string,
        method: "get" | "post" | "put" | "patch" | "delete",
        onBefore?: string,
        values?: any
    ) {
        router[method](slug, values, {
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
                setShowSheet(false);
            },
        });
    }

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
                    setShowSheet(false);
                },
            }
        );
    }

    const [showSheet, setShowSheet] = useState<boolean>(false);

    return (
        <div>
            <Sheet
                open={showSheet}
                onOpenChange={() => setShowSheet(!showSheet)}
            >
                <SheetTrigger asChild>{children}</SheetTrigger>
                <SheetContent
                    side={side}
                    className="w-[400px] md:min-w-[800px] bg-white overflow-y-auto"
                >
                    <SheetHeader>
                        <SheetTitle className="mb-3">
                            <div className="flex flex-row items-center gap-5 border-b p-2">
                                <BuildingOffice2Icon className="h-10" />
                                <span className="text-3xl">
                                    {company.company_name} adatai
                                </span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <EllipsisHorizontalIcon className="h-6" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-white w-64">
                                        <DropdownMenuLabel>
                                            <span>Műveletek</span>
                                        </DropdownMenuLabel>
                                        <hr></hr>
                                        <div>
                                            <div
                                                className="flex flex-row gap-2 items-center hover:bg-red-200 hover:cursor-pointer p-2 text-sm bg-red-100 text-red-900"
                                                onClick={() =>
                                                    handleDeleteCompanySubmit(
                                                        "/company/delete",
                                                        "post",
                                                        "Biztosan törlöd ezt a céget?",
                                                        {
                                                            type: "single",
                                                            selectedItems:
                                                                company,
                                                        }
                                                    )
                                                }
                                            >
                                                <TrashIcon className="h-4" />
                                                <span>Cég törlése</span>
                                            </div>
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </SheetTitle>
                        <SheetDescription>
                            <CompanyData user={company.user} users={users} company={company} type="company" />
                        </SheetDescription>
                    </SheetHeader>
                    <CreateCompanyContactForm company_id={company.id}>
                        <Contacts contacts={company?.contacts} />
                    </CreateCompanyContactForm>

                    <Toaster />
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default CompanySheet;
