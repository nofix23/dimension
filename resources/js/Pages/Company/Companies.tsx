import AdminAuthLayout from "@/Layouts/AdminAuthLayout";
import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useEffect, useState } from "react";
import { useCompanyStore } from "@/store/CompanyStore";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { Button } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    AlignRightIcon,
    ArrowRightIcon,
    CheckIcon,
    CircleIcon,
    Edit2Icon,
    Edit3Icon,
    EyeIcon,
    PlusIcon,
    TrashIcon,
    UserCircle,
    UserCircleIcon,
    UserIcon,
} from "lucide-react";
import {
    BuildingOffice2Icon,
    BuildingOfficeIcon,
    CheckBadgeIcon,
    EllipsisHorizontalIcon,
    MagnifyingGlassCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    ArrowDownIcon,
    MagnifyingGlassIcon,
    Pencil2Icon,
} from "@radix-ui/react-icons";

import { Field, Form, Formik } from "formik";


import { useForm } from "react-hook-form";
import { useToast } from "@/Components/ui/use-toast";
import { initialValues } from "@/Utils/FormikHelper/UpdateCompany";
import { initialValues as initCreateProfileValues } from "@/Utils/FormikHelper/CreateProfile";
import { initialValues as initUpdateProfileValues } from "@/Utils/FormikHelper/UpdateProfile";

import FormikField from "@/Components/FormikField";
import CreateCompanyForm from "@/Components/Admin/Forms/CreateCompanyForm";
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
import CompanySheet from "@/Components/Admin/Company/CompanySheet";

export default function Companies({ auth, companies, users }: PageProps) {
    const {
        companyItems,
        setCompanyItems,
        userItems,
        setUserItems,
        userProfile,
        setUserProfile,
        active,
        setActive,
        setSelectedItem,
        selectedItem,
        selectedItems,
        setSelectedItems,
        filterItems,
        setFilterItems,
    } = useCompanyStore();

    const { toast } = useToast();

    useEffect(() => {
        setCompanyItems(companies);
    }, [ companies ])

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

            onFinish: () => {},
        });
    }



    return (
        <AdminAuthLayout
            user={auth.user}
            header={
                <div className="flex flex-row gap-4 mt-8 items-center font-semibold text-2xl text-gray-600 leading-tight p-2">
                    <BuildingOffice2Icon className="h-12" />
                    <span>Cégek</span>
                </div>
            }
        >
            <Head title="Cégek" />

            <div className="flex flex-row justify-between mt-8 pb-1 border-b w-full min-w-full">
                <div className="flex flex-row items-center">
                    {selectedItems.length > 0 ? (
                        <div className="flex">
                            <div className="flex flex-row items-center gap-2 bg-blue-100 text-blue-900  p-2 hover:cursor-pointer hover:bg-blue-200 rounded-xl">
                                <CheckBadgeIcon className="h-4" />
                                <span>{selectedItems.length} Selected</span>
                            </div>

                            <div
                                className="flex flex-row items-center bg-gray-50 p-2 hover:cursor-pointer hover:bg-gray-100 rounded-xl"
                                onClick={() =>
                                    handleDeleteCompanySubmit(
                                        "/company/delete",
                                        "post",
                                        "Biztosan törlöd a kijelölt cégeket?",
                                        {
                                            type: "multiple",
                                            selectedItems: selectedItems,
                                        }
                                    )
                                }
                            >
                                <TrashIcon className="h-4" />
                                <span>Törlés</span>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>

                <div className="flex flex-row justify-end items-center">
                    <div className="hover:bg-gray-100 hover:cursor-pointer p-2 rounded-2xl">
                        <Popover>
                            <PopoverTrigger asChild>
                                <span className="h-5 hover:cursor-pointer">
                                    Filter
                                </span>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 bg-white rounded-md">
                                <div className="flex flex-col gap-2 flex-grow-2 w-full p-1">
                                    <label>Státusz szerinti szűrés</label>
                                    <hr></hr>

                                    <div className="flex flex-row gap-3 items-center">
                                        <Checkbox
                                            id="active"
                                            onCheckedChange={() =>
                                                setFilterItems(1)
                                            }
                                        />
                                        <label
                                            htmlFor="id"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 bg-green-100 text-green-90 rounded-xl p-2"
                                        >
                                            Aktív
                                        </label>
                                    </div>

                                    <div className="flex flex-row gap-3 items-center">
                                        <Checkbox
                                            id="inactive"
                                            onCheckedChange={() =>
                                                setFilterItems(0)
                                            }
                                        />
                                        <label
                                            htmlFor="id"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 bg-red-100 text-red-90 rounded-xl p-2"
                                        >
                                            Inaktív
                                        </label>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="hover:bg-gray-100 hover:cursor-pointer p-2 rounded-2xl">
                        <span>Rendezés</span>
                    </div>
                    <div className="hover:bg-gray-100 hover:cursor-pointer p-2 rounded-2xl">
                        <MagnifyingGlassIcon className="h-6" />
                    </div>
                    <div className="hover:bg-gray-100 hover:cursor-pointer p-2 rounded-2xl">
                        <EllipsisHorizontalIcon className="h-6" />
                    </div>
                    <div className="hover:bg-gray-100 hover:cursor-pointer p-2 rounded-2xl">
                        <CreateCompanyForm />
                    </div>
                </div>
            </div>
            <div className="max-w-[1300px]">
                <Table className=" text-gray-500 mt-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead className="font-extrabold">
                                Cég neve
                            </TableHead>
                            <TableHead className="font-extrabold">
                                E-mail cím
                            </TableHead>
                            <TableHead className="font-extrabold">
                                Státusz
                            </TableHead>
                            {/* <TableHead>Ország</TableHead>
                            <TableHead>Város</TableHead>
                            <TableHead>Irányítószám</TableHead>
                            <TableHead>Utca</TableHead> */}
                            <TableHead className="font-extrabold">
                                Hozzáférés beállítva
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="">
                        {companyItems.map((company) => (
                            <TableRow
                                key={company.id}
                                className="group/item hover:bg-gray-50 hover:cursor-pointer"
                            >
                                <TableCell className="">
                                    <div className="flex flex-row gap-3">
                                        <div className="flex flex-row gap-3 justify-center group/item">
                                            <CompanySheet
                                                side="right"
                                                company={company}
                                                users={users}
                                                user={company.user}
                                            >
                                                <div className="flex flex-row items-center justify-center gap-2 group/edit invisible group-hover/item:visible">
                                                    <EyeIcon className="group-hover/edit:text-gray-700 h-5 text-gray-400 " />
                                                </div>
                                            </CompanySheet>
                                        </div>
                                        <div className="flex flex-row items-center space-x-2">
                                            <Checkbox
                                                id={company.id.toString()}
                                                onCheckedChange={() =>
                                                    setSelectedItems(company)
                                                }
                                            />
                                            <label
                                                htmlFor="id"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            ></label>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell className="font-medium">
                                    {company.company_name}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {company.email_address}
                                </TableCell>
                                <TableCell className="font-medium flex">
                                    {company.active === 1 && (
                                        <div className="bg-green-100 text-green-900 max-w-[100px] rounded-xl p-2">
                                            Aktív
                                        </div>
                                    )}

                                    {company.active === 0 && (
                                        <div className="bg-red-100 text-red-900 max-w-[100px] rounded-xl p-2">
                                            Inaktív
                                        </div>
                                    )}
                                </TableCell>

                                <TableCell className="font-medium">
                                    {company.user_id ? (
                                        <div className="bg-green-100 text-green-900 max-w-[100px] rounded-xl justify-center flex flex-row">
                                            <CheckIcon className="h-6" />
                                        </div>
                                    ) : (
                                        <div className="bg-red-100 text-red-900 max-w-[100px] rounded-xl justify-center flex flex-row">
                                            <XMarkIcon className="h-6" />
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AdminAuthLayout>
    );
}
