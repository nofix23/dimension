import AdminAuthLayout from '@/Layouts/AdminAuthLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useEffect } from 'react';
import { useGeneralStore } from '@/store/GeneralStore';
import { HomeIcon } from 'lucide-react';
import Calendar from '@/Components/Admin/Dashboard/Calendar';

export default function Dashboard({ auth }: PageProps) {

    return (
        <AdminAuthLayout
            user={auth.user}
            header={
                <div className="flex flex-row gap-4 mt-8 items-center font-semibold text-2xl text-gray-600 leading-tight p-2">
                    <HomeIcon className="h-12" />
                    <span>Irányítópult</span>
                </div>
            }
        >
            <Head title="Irányítópult" />

            <div className="mt-8">
                <Calendar />
            </div>
        </AdminAuthLayout>
    );
}
