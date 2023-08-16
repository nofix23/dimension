import AdminAuthLayout from '@/Layouts/AdminAuthLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useEffect } from 'react';
import { useGeneralStore } from '@/store/GeneralStore';
import { HomeIcon } from 'lucide-react';

export default function Dashboard({ auth }: PageProps) {

    return (
        <AdminAuthLayout
            user={auth.user}
            header={
                <div className="flex flex-row gap-4 mt-4 items-center font-semibold text-2xl text-gray-600 leading-tight p-2">
                    <HomeIcon className="h-12" />
                    <span>Vezérlőpult</span>
                </div>
            }
        >
            <Head title="Vezérlőpult" />

            <div className="mt-8">
                <h1>Content</h1>
            </div>
        </AdminAuthLayout>
    );
}
