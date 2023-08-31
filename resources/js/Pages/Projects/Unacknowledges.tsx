import AdminAuthLayout from "@/Layouts/AdminAuthLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useEffect } from "react";
import { HomeIcon } from "lucide-react";
import { BoltIcon } from "@heroicons/react/24/outline";
import { useCustomerRequestStore } from "@/store/CustomerRequestStore";
import NewCustomerRequestsTable from "@/Components/Admin/Projects/NewCustomerRequestsTable";

export default function Unacknowledges({ auth, customer_requests }: PageProps) {

    const { setCustomerRequestItems} = useCustomerRequestStore();

    useEffect(() => {
        setCustomerRequestItems(customer_requests);
    }, [ customer_requests ])

    return (
        <AdminAuthLayout
            user={auth.user}
            header={
                <div className="flex flex-row gap-4 mt-8 items-center font-semibold text-2xl text-gray-600 leading-tight p-2">
                    <BoltIcon className="h-12" />
                    <span>Új árajánlatok</span>
                </div>
            }
        >
            <Head title="Új árajánlatok" />

            <div className="mt-8">
                <NewCustomerRequestsTable />
            </div>
        </AdminAuthLayout>
    );
}
