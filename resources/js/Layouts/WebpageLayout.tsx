import ApplicationLogo from "@/Components/ApplicationLogo";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";


export default function WebpageLayout({ children }: PropsWithChildren) {
    return (
        <div className="max-h-full sm:min-h-screen flex flex-col gap-6 sm:gap-0 sm:flex-row sm:justify-center items-start sm:pt-6 bg-gray-100">
            { children }
        </div>
    );
}
