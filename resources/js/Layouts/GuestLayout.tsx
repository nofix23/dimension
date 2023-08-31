import ApplicationLogo from '@/Components/ApplicationLogo';
import { BriefcaseIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import Logo from "../../../storage/app/public/img/logo.jpg";
import { Toaster } from '@/Components/ui/toaster';

type Props = {
    comment: string;
}
export default function Guest({ children, comment }: PropsWithChildren<Props>) {
    return (
        <div className="max-h-full sm:min-h-screen flex flex-col gap-6 sm:gap-0 sm:flex-row sm:justify-center items-center sm:pt-6 bg-gray-100">
            <div className="sm:w-[600px] w-full text-white flex flex-col justify-center">
                <div className="bg-gradient-to-b from-[#01A2D6] to-[#64c0df] sm:min-h-full text-center">
                    <Link href="/dashboard">
                        <div className="flex flex-row justify-center sm:h-[400px] gap-3 p-6 items-center text-3xl ">
                            <img src={Logo} className="h-64" />
                        </div>
                    </Link>
                </div>
                <div className="bg-[#01A2D6] text-white flex flex-col items-center justify-center gap-8 h-auto p-8 sm:h-[200px]">
                    <span className="text-blue-50 font-bold">{comment}</span>

                    <span className="text-muted font-extralight">
                        Copyright © 2023 Dimenzió Dekoráció, Minden jog
                        fenntartva.
                    </span>
                </div>
            </div>

            <div className="w-full p-4 sm:p-3 sm:w-[500px] sm:h-[600px] flex flex-col justify-center sm:border-2 border-slate-200 text-[#01A2D6]">
                {children}
                <Toaster />
            </div>
        </div>
    );
}
