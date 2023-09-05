import AdminAuthLayout from "@/Layouts/AdminAuthLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useEffect } from "react";
import { HomeIcon } from "lucide-react";
import { BoltIcon } from "@heroicons/react/24/outline";
import { useCustomerRequestStore } from "@/store/CustomerRequestStore";
import NewCustomerRequestsTable from "@/Components/Admin/Projects/NewCustomerRequestsTable";
import Activities from "@/Components/Activity/Activities";
import { useActivityLogStore } from "@/store/ActivityLogStore";
import { useUserStore } from "@/store/UserStore";

export default function Page({ auth, activities, users }: PageProps) {

    const useActivitylogStore = useActivityLogStore();

    const useUsersStore = useUserStore();

    useEffect(() => {
        useActivitylogStore.setActivityLogItems(activities);
        useUsersStore.setUserItems(users);
    }, [ activities, users ])

    return (
        <AdminAuthLayout
            user={auth.user}
            header={
                <div className="flex flex-row gap-4 mt-8 items-center font-semibold text-2xl text-gray-600 leading-tight p-2">
                    <BoltIcon className="h-12" />
                    <span>Felhasználói aktivitás</span>
                </div>
            }
        >
            <Head title="elhasználói aktivitás" />

            <div className="flex flex-col gap-8 mt-8">
                <Activities />
            </div>
        </AdminAuthLayout>
    );
}
