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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { CheckIcon, EyeIcon, TrashIcon } from "lucide-react";
import {
    BuildingOffice2Icon,
    CheckBadgeIcon,
    EllipsisHorizontalIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { useToast } from "@/Components/ui/use-toast";
import CreateCompanyForm from "@/Components/Admin/Forms/CreateCompanyForm";
import { Checkbox } from "@/Components/ui/checkbox";
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
    }, [companies]);

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

            onFinish: () => {
                setSelectedItem(
                    selectedItems.splice(selectedItems.length - 1, 1)
                );
            },
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

            <div className="flex flex-wrap sm:flex-row justify-between mt-8 pb-1 border-b w-full min-w-full text-xs">
                <div className="flex flex-row items-center">
                    {selectedItems.length > 0 ? (
                        <div className="flex gap-2">
                            <div className="flex flex-row items-center p-2 hover:cursor-pointer bg-[#01A2D6] text-white hover:bg-blue-400 border-slate-300">
                                <CheckBadgeIcon className="h-4" />
                                <span>{selectedItems.length} kiválasztva</span>
                            </div>

                            <div
                                className="flex flex-row items-center p-2 hover:cursor-pointer hover:bg-red-200 bg-red-100 text-red-900"
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
                    <div className="hover:bg-gray-100 hover:cursor-pointer p-2">
                        <Popover>
                            <PopoverTrigger
                                asChild
                                className="flex items-center"
                            >
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
                    <div className="hover:bg-gray-100 hover:cursor-pointer p-2">
                        <span>Rendezés</span>
                    </div>
                    <div className="hover:bg-gray-100 hover:cursor-pointer p-2">
                        <MagnifyingGlassIcon className="h-6" />
                    </div>
                    <div className="hover:bg-gray-100 hover:cursor-pointer p-2">
                        <EllipsisHorizontalIcon className="h-6" />
                    </div>
                    <div className="hover:cursor-pointer p-2">
                        <CreateCompanyForm />
                    </div>
                </div>
            </div>
            <div className="max-w-[1300px]">
                <Table className=" text-gray-500 mt-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead className="font-extralight">
                                Cég neve
                            </TableHead>
                            <TableHead className="font-extralight">
                                E-mail cím
                            </TableHead>
                            <TableHead className="font-extralight">
                                Kapcsolattartók száma
                            </TableHead>
                            <TableHead className="font-extralight">
                                Projektek száma
                            </TableHead>
                            <TableHead className="font-extralight">
                                Státusz
                            </TableHead>
                            {/* <TableHead>Ország</TableHead>
                            <TableHead>Város</TableHead>
                            <TableHead>Irányítószám</TableHead>
                            <TableHead>Utca</TableHead> */}
                            <TableHead className="font-extralight">
                                Hozzáférés beállítva
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="">
                        {companyItems.map((company) => (
                            <TableRow
                                key={company.id}
                                className="group/item hover:bg-[#01A2D6]/10 hover:cursor-pointer hover:text-[#01A2D6]"
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
                                                    <EyeIcon className="h-5 text-[#01A2D6] " />
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
                                <TableCell className="font-medium">
                                    {company?.contacts?.length}
                                </TableCell>
                                <TableCell className="font-medium">
                                    0
                                </TableCell>
                                <TableCell className="font-medium flex">
                                    {company.active === 1 && (
                                        <div className="bg-green-100 text-green-900 max-w-[100px] rounded-xl p-2 h-6 flex items-center">
                                            Aktív
                                        </div>
                                    )}

                                    {company.active === 0 && (
                                        <div className="bg-red-100 text-red-900 max-w-[100px] rounded-xl p-2 h-6 flex items-center">
                                            Inaktív
                                        </div>
                                    )}
                                </TableCell>

                                <TableCell className="font-medium">
                                    {company.user_id ? (
                                        <div className="bg-green-100 text-green-900 max-w-[100px] rounded-xl justify-center items-center flex flex-row h-6">
                                            <CheckIcon className="h-4" />
                                        </div>
                                    ) : (
                                        <div className="bg-red-100 text-red-900 max-w-[100px] rounded-xl justify-center items-center flex flex-row h-6">
                                            <XMarkIcon className="h-4" />
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
