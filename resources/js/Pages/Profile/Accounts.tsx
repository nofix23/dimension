import AdminAuthLayout from "@/Layouts/AdminAuthLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useEffect } from "react";
import { useGeneralStore } from "@/store/GeneralStore";
import { UserIcon, UsersIcon } from "@heroicons/react/24/outline";

export default function Accounts({ auth, users }: PageProps) {
    return (
        <AdminAuthLayout
            user={auth.user}
            header={
                <div className="flex flex-row gap-4 items-center mt-24 ml-24 font-semibold text-3xl text-gray-600 leading-tight bg-gray-50 p-8">
                    <UsersIcon className="h-12" />
                    <span>Hozzáférések</span>
                </div>
            }
        >
            <Head title="Hozzáférések" />

            <div className="mt-8">
                <h1>Content</h1>
            </div>
        </AdminAuthLayout>
    );
}
