import { User } from "@/types";
import React from "react";
import { twMerge } from "tailwind-merge";
import UpdateUserForm from "./UpdateUserForm";
import UpdateCompanyForm from "../Company/UpdateCompanyForm";

type Props = {
    user: User;
    users: User[];
};
function CompanyData({ user, users }: Props) {
    return (
        <div className="">
            <div className="mb-4 text-lg font-bold">
                <span>Általános adatok</span>
            </div>

            <div className="flex flex-col gap-4 text-left">
                <div className="flex flex-row items-center gap-3 ml-4">
                    <div className="w-[200px]">
                        <span>Cég:</span>
                    </div>
                    <div className="bg-gray-50 p-2 w-[500px] rounded-xl">
                        <span className="ml-2">
                            {user.company.company_name}
                        </span>
                    </div>
                </div>

                <div className="flex flex-row items-center gap-3 ml-4">
                    <div className="w-[200px]">
                        <span>E-mail:</span>
                    </div>
                    <div className="bg-gray-50 p-2 w-[500px] rounded-xl">
                        <span className="ml-2">
                            {user.company.email_address}
                        </span>
                    </div>
                </div>

                <div className="flex flex-row items-center gap-3 ml-4">
                    <div className="w-[200px]">
                        <span>Telefonszám:</span>
                    </div>
                    <div className="bg-gray-50 p-2 w-[500px] rounded-xl">
                        <span className="ml-2">
                            {user.company.phone_number}
                        </span>
                    </div>
                </div>

                <div className="flex flex-row items-center gap-3 ml-4">
                    <div className="w-[200px]">
                        <span>Weboldal:</span>
                    </div>
                    <div className="bg-gray-50 p-4 w-[500px] rounded-xl overflow-x-auto">
                            <a
                                className="underline text-blue-400"
                                href={user.company.website}
                                target="_blank"
                            >
                                {user.company.website}
                            </a>
                    </div>
                </div>

                <div className="flex flex-row items-center gap-3 ml-4">
                    <div className="w-[200px]">
                        <span>Létrehozás dátuma:</span>
                    </div>
                    <div className="bg-gray-50 p-2 w-[500px] rounded-xl">
                        <span className="ml-2">
                            {new Date(user.company.created_at).toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className="flex flex-row items-center gap-3 ml-4">
                    <div className="w-[200px]">
                        <span>Cég státusz:</span>
                    </div>
                    <div
                        className={twMerge(
                            "bg-gray-100 p-2 w-[500px] rounded-xl",
                            user.company.active == 1
                                ? "bg-green-100"
                                : "bg-red-100"
                        )}
                    >
                        <span className="ml-2">
                            {user.company.active == 1 ? "Aktív" : "Inaktív"}
                        </span>
                    </div>
                </div>
                <div className="">
                    <UpdateCompanyForm
                        company={user.company}
                        users={users}
                        user={user}
                        triggerText="Szerkesztés"
                    />
                </div>
            </div>
        </div>
    );
}

export default CompanyData;
