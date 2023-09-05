import AdminAuthLayout from "@/Layouts/AdminAuthLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useEffect } from "react";
import { useGeneralStore } from "@/store/GeneralStore";
import { UserIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useUserStore } from "@/store/UserStore";
import Groups from "@/Components/Admin/Accounts/Groups";
import GeneralInformations from "@/Components/Admin/Accounts/GeneralInformations";
import { useCompanyStore } from "@/store/CompanyStore";

export default function Accounts({ auth, users, companies }: PageProps) {

    const { userItems, setUserItems} = useUserStore();

    const { setCompanyItems } = useCompanyStore();

    useEffect(() => {
        setUserItems(users);
        setCompanyItems(companies);
    }, [users])

    return (
        <AdminAuthLayout
            user={auth.user}
            header={
                <div className="flex flex-row gap-4 mt-8 items-center font-semibold text-2xl text-gray-600 leading-tight p-2">
                    <UsersIcon className="h-12" />
                    <span>Hozzáférések</span>
                </div>
            }
        >
            <Head title="Hozzáférések" />

            <div className="flex flex-col gap-8 mt-8">
                {/* <GeneralInformations count={userItems.length}/> */}
                <Groups />
            </div>
        </AdminAuthLayout>
    );
}
