import AdminAuthLayout from '@/Layouts/AdminAuthLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useEffect } from 'react';
import { useGeneralStore } from '@/store/GeneralStore';

export default function Dashboard({ auth }: PageProps) {

    return (
        <AdminAuthLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="mt-8">
                <h1>Content</h1>

            </div>
        </AdminAuthLayout>
    );
}
