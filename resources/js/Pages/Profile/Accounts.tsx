import AdminAuthLayout from "@/Layouts/AdminAuthLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useEffect } from "react";
import { useGeneralStore } from "@/store/GeneralStore";
import { UserIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useUserStore } from "@/store/UserStore";
import Groups from "@/Components/Admin/Accounts/Groups";
import GeneralInformations from "@/Components/Admin/Accounts/GeneralInformations";

export default function Accounts({ auth, users }: PageProps) {

    const { userItems, setUserItems} = useUserStore();
    
    useEffect(() => {
        setUserItems(users);
    }, [users])

    return (
        <AdminAuthLayout
            user={auth.user}
            header={
                <div className="flex flex-row gap-4 mt-4 items-center font-semibold text-2xl text-gray-600 leading-tight p-2">
                    <UsersIcon className="h-12" />
                    <span>Hozzáférések</span>
                </div>
            }
        >
            <Head title="Hozzáférések" />

            <div className="mt-8">
                <GeneralInformations count={userItems.length}/>
                <Groups />
            </div>
        </AdminAuthLayout>
    );
}
