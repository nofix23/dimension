import AdminAuthLayout from "@/Layouts/AdminAuthLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useEffect } from "react";
import { HomeIcon } from "lucide-react";

export default function Projects({ auth }: PageProps) {
    return (
        <AdminAuthLayout
            user={auth.user}
            header={
                <div className="flex flex-row gap-4 mt-8 items-center font-semibold text-2xl text-gray-600 leading-tight p-2">
                    <HomeIcon className="h-12" />
                    <span>Projektek</span>
                </div>
            }
        >
            <Head title="Projektek" />

            <div className="mt-8">
            </div>
        </AdminAuthLayout>
    );
}
