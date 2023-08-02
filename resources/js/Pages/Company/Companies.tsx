import AdminAuthLayout from "@/Layouts/AdminAuthLayout";
import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useEffect } from "react";
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
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";

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

    const form = useForm();

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

    useEffect(() => {
        setCompanyItems(companies);
        setUserItems(users);
    }, []);

    useEffect(() => {
        if (filterItems.length > 0) {
            const active = filterItems.find((item) => item === 1);

            const inactive = filterItems.find((item) => item === 0);

                setCompanyItems(
                    companies.filter(
                        (company) => company.active === active || company.active === inactive
                    )
                )


        }

        setUserProfile(selectedItem?.user);
    }, [filterItems, setFilterItems, setCompanyItems, selectedItem]);

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
                id: selectedItem?.id,
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

                onFinish: () => {},
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

            onFinish: () => {},
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

                onFinish: () => {},
            }
        );
    }

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

                onFinish: () => {},
            }
        );
    }

    return (
        <AdminAuthLayout
            user={auth.user}
            header={
                <div className="flex flex-row gap-4 mt-4 items-center font-semibold text-2xl text-blue-500 leading-tight p-2">
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
                                        "",
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

                                    <div className="flex flex-row gap-3">
                                        <Checkbox
                                            id="active"
                                            onCheckedChange={() =>
                                                setFilterItems(1)
                                            }
                                        />
                                        <label
                                            htmlFor="id"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 bg-green-100 text-green-90 rounded-xl p-1"
                                        >
                                            Aktív
                                        </label>
                                    </div>

                                    <div className="flex flex-row gap-3">
                                        <Checkbox
                                            id="inactive"
                                            onCheckedChange={() =>
                                                setFilterItems(0)
                                            }
                                        />
                                        <label
                                            htmlFor="id"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 bg-red-100 text-red-90 rounded-xl p-1"
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
                    <Dialog>
                        <DialogTrigger>
                            <Button className="bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-xl">
                                <div className="flex flex-row justify-center items-center">
                                    <PlusIcon className="h-4" />
                                    <span>Hozzáadás</span>
                                </div>
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="min-w-[600px] bg-white">
                            <DialogHeader>
                                <DialogTitle className="mb-8">
                                    Cég hozzáadása a rendszerhez
                                </DialogTitle>
                                <DialogDescription>
                                    <CreateCompanyForm />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="min-w-[1500px]">
                <Table className=" text-gray-500 mt-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead className="w-[100px]">
                                Cég neve
                            </TableHead>
                            <TableHead>
                                <div className="flex flex-row gap-3">
                                    <span>Státusz: </span>
                                    {/* {Number(active) === -1 ? (
                                    <span className="text-blue-500">
                                        Összes
                                    </span>
                                ) : Number(active) === 1 ? (
                                    <span className="text-green-500">
                                        Aktív
                                    </span>
                                ) : (
                                    <span className="text-red-500">
                                        Inaktív
                                    </span>
                                )} */}
                                </div>
                            </TableHead>
                            <TableHead>Ország</TableHead>
                            <TableHead>E-mail cím</TableHead>
                            <TableHead>Profilhoz csatolt</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="">
                        {companyItems.map((company) => (
                            <TableRow
                                key={company.id}
                                className="group/item hover:bg-gray-50 hover:cursor-pointer"
                            >
                                <TableCell className="">
                                    <div className="flex gap-3">
                                        <div className="flex flex-row items-center justify-center gap-2 group/edit invisible group-hover/item:visible">
                                            <EyeIcon
                                                className="group-hover/edit:text-gray-700 h-5 text-gray-400 "
                                                onClick={() =>
                                                    setSelectedItem(company)
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2">
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
                                    <div className="flex flex-row justify-center items-center">
                                        {company.company_name}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">
                                    {company.active === 1 && (
                                        <div className="flex justify-center items-center max-w-[50px] bg-green-100 text-green-900 rounded-xl">
                                            <span>Aktív</span>
                                        </div>
                                    )}

                                    {company.active === 0 && (
                                        <div className="flex justify-center items-center max-w-[50px] bg-red-100 text-red-900 rounded-xl">
                                            <span>Inaktív</span>
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {company.country}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {company.email_address}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {company.user_id ? (
                                        <div className="bg-green-100 text-green-900 max-w-[200px] rounded-xl">
                                            <span>
                                                @{company.user.name} /{" "}
                                                {company.user.email} /{" "}
                                                {company.user.role}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="bg-red-100 text-red-900 max-w-[200px] rounded-xl">
                                            <span>
                                                Nincs még profillal párosítva
                                            </span>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {selectedItem && (
                <Sheet open onOpenChange={() => setSelectedItem(null)}>
                    <SheetContent
                        side="right"
                        className="bg-white md:min-w-[800px]"
                    >
                        <SheetHeader>
                            <SheetTitle className="mb-3">
                                <div className="flex flex-row items-center gap-5 border-b p-2">
                                    <BuildingOffice2Icon className="h-10" />
                                    <span className="text-3xl">
                                        {selectedItem.company_name} adatai
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
                                                    className="flex flex-row gap-2 items-center hover:bg-gray-50 hover:cursor-pointer p-2 text-sm"
                                                    onClick={() =>
                                                        handleDeleteCompanySubmit(
                                                            "/company/delete",
                                                            "post",
                                                            "",
                                                            {
                                                                type: "single",
                                                                selectedItems:
                                                                    selectedItem,
                                                            }
                                                        )
                                                    }
                                                >
                                                    <TrashIcon className="h-4" />
                                                    <span>Törlés</span>
                                                </div>
                                            </div>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </SheetTitle>
                            <SheetDescription>
                                <Formik
                                    initialValues={initialValues(selectedItem)}
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
                                                        className="hover:bg-gray-50 hover:cursor-pointer min-w-[300px]"
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
                                                        className="hover:bg-gray-50 hover:cursor-pointer min-w-[300px]"
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
                                                        className="hover:bg-gray-50 hover:cursor-pointer min-w-[300px]"
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
                                                        className="p-3 focus:outline-none hover:bg-gray-50 hover:cursor-pointer min-w-[100px]"
                                                    >
                                                        <option value={1}>
                                                            <div>
                                                                <span>
                                                                    Igen
                                                                </span>
                                                            </div>
                                                        </option>
                                                        <option value={0}>
                                                            <div>
                                                                <span>Nem</span>
                                                            </div>
                                                        </option>
                                                    </Field>
                                                </div>

                                                <div className="flex flex-row gap-8 items-center">
                                                    <span className="">
                                                        Felhasználói profil
                                                        társítása:
                                                    </span>

                                                    <div className="">
                                                        <Popover>
                                                            <PopoverTrigger
                                                                asChild
                                                            >
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
                                                                        <div className="flex flex-row gap-3 p-1  bg-red-100 text-red-900 hover:cursor-pointer">
                                                                            <span>
                                                                                Nincs
                                                                                párosítva
                                                                            </span>
                                                                            <ArrowDownIcon className="h-5" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="overflow-auto w-[600px] max-h-[600px] bg-white">
                                                                <div className="flex flex-col w-full">
                                                                    {userItems.map(
                                                                        (
                                                                            user
                                                                        ) => (
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
                                                                    <Dialog>
                                                                        <DialogTrigger
                                                                            asChild
                                                                        >
                                                                            <Button className="bg-green-100 hover:bg-green-200">
                                                                                <div className="flex flex-row gap-2">
                                                                                    <PlusIcon className="h-4" />
                                                                                    <span>
                                                                                        Új
                                                                                        profil
                                                                                        létrehozása
                                                                                    </span>
                                                                                </div>
                                                                            </Button>
                                                                        </DialogTrigger>
                                                                        <DialogContent className="min-w-[600px] bg-white">
                                                                            <DialogHeader>
                                                                                <DialogTitle>
                                                                                    Profil
                                                                                    létrehozása
                                                                                </DialogTitle>
                                                                                <DialogDescription>
                                                                                    Töltsd
                                                                                    ki
                                                                                    az
                                                                                    űrlapot
                                                                                    a
                                                                                    szükséges
                                                                                    adatokkal
                                                                                    és
                                                                                    kattints
                                                                                    a
                                                                                    mentés
                                                                                    gombra.
                                                                                </DialogDescription>
                                                                            </DialogHeader>
                                                                            <div className="grid gap-4 py-4">
                                                                                <Formik
                                                                                    initialValues={initCreateProfileValues()}
                                                                                    onSubmit={(
                                                                                        values,
                                                                                        actions
                                                                                    ) => {
                                                                                        handleCreateSubmit(
                                                                                            "/profile/create",
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
                                                                                                    required={
                                                                                                        true
                                                                                                    }
                                                                                                    placeholder=""
                                                                                                    readOnly={
                                                                                                        false
                                                                                                    }
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
                                                                                                    required={
                                                                                                        true
                                                                                                    }
                                                                                                    placeholder=""
                                                                                                    readOnly={
                                                                                                        false
                                                                                                    }
                                                                                                    className="col-span-3"
                                                                                                />
                                                                                            </div>

                                                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                                                <Label
                                                                                                    htmlFor="password_confirmation"
                                                                                                    className="text-right"
                                                                                                >
                                                                                                    Jelszó
                                                                                                    megerősítése
                                                                                                </Label>
                                                                                                <FormikField
                                                                                                    id="password_confirmation"
                                                                                                    name="password_confirmation"
                                                                                                    type="password"
                                                                                                    required={
                                                                                                        true
                                                                                                    }
                                                                                                    placeholder=""
                                                                                                    readOnly={
                                                                                                        false
                                                                                                    }
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
                                                                                                    required={
                                                                                                        true
                                                                                                    }
                                                                                                    placeholder=""
                                                                                                    readOnly={
                                                                                                        false
                                                                                                    }
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
                                                                                                <Button className="bg-green-100 hover:bg-green-200 ">
                                                                                                    Profil
                                                                                                    létrehozása
                                                                                                </Button>
                                                                                            </div>
                                                                                        </Form>
                                                                                    )}
                                                                                </Formik>
                                                                            </div>
                                                                        </DialogContent>
                                                                    </Dialog>
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
                                                            {selectedItem.user && (
                                                                <Button className="">
                                                                    <div className="flex flex-row items-center justify-center gap-3 bg-green-100 text-green-900 hover:cursor-pointer hover:bg-green-200">
                                                                        <span>
                                                                            {
                                                                                selectedItem
                                                                                    .user
                                                                                    .name
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
                                                                    Profil
                                                                    adatainak
                                                                    szerkesztése
                                                                </DialogTitle>
                                                                <DialogDescription></DialogDescription>
                                                            </DialogHeader>
                                                            <div className="grid gap-4 py-4">
                                                                <Formik
                                                                    initialValues={initUpdateProfileValues(
                                                                        selectedItem.user
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
                                                                                    required={
                                                                                        true
                                                                                    }
                                                                                    placeholder=""
                                                                                    readOnly={
                                                                                        false
                                                                                    }
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
                                                                                    required={
                                                                                        true
                                                                                    }
                                                                                    placeholder=""
                                                                                    readOnly={
                                                                                        false
                                                                                    }
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
                                                                                <Button className="bg-green-100 hover:bg-green-200 ">
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
                                                    <span>Megjegyzés:</span>

                                                    <FormikField
                                                        id="comment"
                                                        name="comment"
                                                        type="text"
                                                        required={false}
                                                        placeholder=""
                                                        readOnly={false}
                                                        as="textarea"
                                                        className="border-gray-50 border-2 p-4 min-h-[100px] hover:bg-gray-50 hover:cursor-pointer"
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
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            )}
        </AdminAuthLayout>
    );
}
