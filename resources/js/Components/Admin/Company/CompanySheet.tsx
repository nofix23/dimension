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
    const { userProfile, setUserProfile, selectedItem } = useCompanyStore();

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
                                        <div className="flex flex-col gap-5 text-md ml-2">
                                            <div className="flex flex-row items-center">
                                                <div className="w-40 sm:w-45">
                                                    <span>Cég neve:</span>
                                                </div>
                                                <FormikField
                                                    id="company_name"
                                                    name="company_name"
                                                    type="text"
                                                    required={false}
                                                    placeholder=""
                                                    readOnly={false}
                                                    className="hover:bg-gray-50 w-[500px] text-[#01A2D6] font-bold"
                                                />
                                            </div>
                                            <div className="flex flex-row items-center">
                                                <div className="w-40 sm:w-45">
                                                    <span>E-mail cím:</span>
                                                </div>
                                                <FormikField
                                                    id="email_address"
                                                    name="email_address"
                                                    type="text"
                                                    required={false}
                                                    placeholder=""
                                                    readOnly={false}
                                                    className="hover:bg-gray-50 w-[500px] text-[#01A2D6] font-bold"
                                                />
                                            </div>
                                            <div className="flex flex-row items-center">
                                                <div className="w-40 sm:w-45">
                                                    <span>Telefonszám:</span>
                                                </div>
                                                <FormikField
                                                    id="phone_number"
                                                    name="phone_number"
                                                    type="text"
                                                    required={false}
                                                    placeholder=""
                                                    readOnly={false}
                                                    className="hover:bg-gray-50 w-[500px] text-[#01A2D6] font-bold"
                                                />
                                            </div>

                                            <div className="flex flex-row items-center">
                                                <div className="w-40 sm:w-45">
                                                    <span>Weboldal:</span>
                                                </div>
                                                <FormikField
                                                    id="website"
                                                    name="website"
                                                    type="text"
                                                    required={false}
                                                    placeholder=""
                                                    readOnly={false}
                                                    className="hover:bg-gray-50 w-[500px] text-[#01A2D6] font-bold"
                                                />
                                            </div>

                                            <div className="flex flex-row items-center">
                                                <div className="w-40 sm:w-45">
                                                    <span>Aktív:</span>
                                                </div>
                                                <Field
                                                    id="active"
                                                    name="active"
                                                    type="text"
                                                    required={false}
                                                    placeholder=""
                                                    readOnly={false}
                                                    as="select"
                                                    className="p-3 focus:outline-none hover:bg-gray-50 cursor-pointer w-full sm:w-[100px] text-[#01A2D6] font-bold"
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

                                            <div className="flex flex-row gap-2 items-center">
                                                <div className="w-40 sm:w-45">
                                                    <span>
                                                        Felhasználói profil:
                                                    </span>
                                                </div>

                                                <div className="">
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <div className="flex flex-row gap-3 items-center">
                                                                {userProfile ? (
                                                                    <div className="flex flex-row items-center justify-center gap-3 bg-green-100 text-green-900 hover:cursor-pointer hover:bg-green-200">
                                                                        <span className="font-semibold">
                                                                            {
                                                                                userProfile.name
                                                                            }
                                                                        </span>
                                                                        <ArrowDownIcon className="h-5 " />
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex flex-row gap-3 p-1  bg-red-100 text-red-900 hover:cursor-pointer sm:w-[500px]">
                                                                        <span>
                                                                            Nincs
                                                                            párosítva
                                                                        </span>
                                                                        <ArrowDownIcon className="h-5" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </PopoverTrigger>
                                                        <PopoverContent
                                                            className="overflow-y-auto w-[600px] max-h-[800px] sm:max-h-[1000px] bg-white"
                                                            sideOffset={-300}
                                                        >
                                                            <div className="flex flex-col w-full">
                                                                {users.map(
                                                                    (user) => (
                                                                        <div
                                                                            key={
                                                                                user.id
                                                                            }
                                                                            className={`

                                                                                ${
                                                                                    userProfile &&
                                                                                    userProfile.id ===
                                                                                        user.id
                                                                                        ? "bg-green-50"
                                                                                        : ""
                                                                                }
                                                                                flex flex-row gap-2 hover:bg-gray-50 p-2 hover:cursor-pointer`}
                                                                        >
                                                                            <input
                                                                                name={
                                                                                    user.name
                                                                                }
                                                                                type="radio"
                                                                                value={
                                                                                    user.id
                                                                                }
                                                                                onChange={() =>
                                                                                    setUserProfile(
                                                                                        user
                                                                                    )
                                                                                }
                                                                                checked={
                                                                                    userProfile &&
                                                                                    userProfile.id ===
                                                                                        user.id
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                            />
                                                                            <label className="hover:cursor-pointer">
                                                                                <div className="flex flex-row gap-4 pl-3 items-center">
                                                                                    <span className="text-blue-600">
                                                                                        <UserIcon className="h-4" />
                                                                                    </span>
                                                                                    <div className="flex flex-col">
                                                                                        <span className="text-sm">
                                                                                            {
                                                                                                user.name
                                                                                            }
                                                                                        </span>
                                                                                        <span className="text-sm">
                                                                                            {
                                                                                                user.email
                                                                                            }
                                                                                        </span>
                                                                                        <span className="text-sm">
                                                                                            {
                                                                                                user.role
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                    {userProfile?.id ===
                                                                                        user.id && (
                                                                                        <div className="flex">
                                                                                            <CheckIcon className="h-4" />
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                )}

                                                                <div className="flex flex-row gap-4 hover:bg-gray-50 bg-red-100 p-2 hover:cursor-pointer">
                                                                    <input
                                                                        name={
                                                                            "Egyik sem"
                                                                        }
                                                                        type="radio"
                                                                        value={
                                                                            0
                                                                        }
                                                                        onChange={() =>
                                                                            setUserProfile(
                                                                                null
                                                                            )
                                                                        }
                                                                        checked={
                                                                            !userProfile
                                                                                ? true
                                                                                : false
                                                                        }
                                                                    />
                                                                    <label className="hover:cursor-pointer">
                                                                        <div className="flex flex-row gap-2 pl-3 items-center">
                                                                            <span className="text-blue-600">
                                                                                <XMarkIcon className="h-4" />
                                                                            </span>
                                                                            <div className="flex flex-col">
                                                                                <span className="text-sm">
                                                                                    Egyik
                                                                                    sem
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </label>
                                                                </div>
                                                            </div>

                                                            <div className="mt-4">
                                                                <CreateProfile
                                                                    triggerText=""
                                                                    TriggerIcon={
                                                                        PlusIcon
                                                                    }
                                                                />
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                            </div>

                                            <div className="flex flex-row gap-8 items-center">
                                                <span>
                                                    Társított felhasználói
                                                    profil beállításai:
                                                </span>

                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        {user && (
                                                            <Button className="">
                                                                <div className="flex flex-row items-center justify-center gap-3 bg-green-100 text-green-900 hover:cursor-pointer hover:bg-green-200">
                                                                    <span>
                                                                        {
                                                                            user.name
                                                                        }
                                                                    </span>
                                                                    <UserCircleIcon className="h-4" />
                                                                </div>
                                                            </Button>
                                                        )}
                                                    </DialogTrigger>
                                                    <DialogContent className="min-w-[600px] bg-white">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Profil adatainak
                                                                szerkesztése
                                                            </DialogTitle>
                                                            <DialogDescription></DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <Formik
                                                                initialValues={initUpdateProfileValues(
                                                                    user
                                                                )}
                                                                onSubmit={(
                                                                    values,
                                                                    actions
                                                                ) => {
                                                                    handleUpdateProfileSubmit(
                                                                        "/profile/update",
                                                                        "post",
                                                                        undefined,
                                                                        values
                                                                    );
                                                                }}
                                                            >
                                                                {({
                                                                    isValid,
                                                                    values,
                                                                }) => (
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
                                                                                required={
                                                                                    true
                                                                                }
                                                                                placeholder=""
                                                                                readOnly={
                                                                                    false
                                                                                }
                                                                                className="col-span-3 text-[#01A2D6] font-bold"
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
                                                                                required={
                                                                                    true
                                                                                }
                                                                                placeholder=""
                                                                                readOnly={
                                                                                    false
                                                                                }
                                                                                className="col-span-3 text-[#01A2D6] font-bold"
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
                                                                                required={
                                                                                    true
                                                                                }
                                                                                placeholder=""
                                                                                readOnly={
                                                                                    false
                                                                                }
                                                                                as="select"
                                                                                className="col-span-3 text-[#01A2D6] font-bold"
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
                                                                            <Button className="bg-[#01A2D6] hover:bg-blue-400 text-white">
                                                                                Változtatások
                                                                                mentése
                                                                            </Button>
                                                                        </div>
                                                                    </Form>
                                                                )}
                                                            </Formik>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>

                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col items-start">
                                                    <span>Megjegyzés:</span>
                                                </div>

                                                <FormikField
                                                    id="comment"
                                                    name="comment"
                                                    type="text"
                                                    required={false}
                                                    placeholder=""
                                                    readOnly={false}
                                                    as="textarea"
                                                    className="border-gray-50 border-2 p-4 min-h-[100px] hover:bg-gray-50 text-[#01A2D6] font-bold"
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
                        </SheetDescription>
                    </SheetHeader>
                    <CreateCompanyContactForm>
                        <Contacts contacts={company?.contacts} />
                    </CreateCompanyContactForm>

                    <Toaster />
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default CompanySheet;
