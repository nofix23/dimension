import { CompanyContact } from "@/types";
import React from "react";

type Props = {
    contacts: CompanyContact[];
};

function Contacts({ contacts }: Props) {
    console.log(contacts);

    return (
        <div>
            {contacts.length > 0 ? (
                <div className="flex flex-col gap-5 pt-8 pb-8">
                    {contacts?.map((contact: CompanyContact) => (
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col">
                                <div className="flex flex-row gap-3">
                                    <span>-</span>
                                    <span className="font-bold">
                                        {contact.name}
                                    </span>
                                </div>
                                <div className="flex flex-col ml-4">
                                    <span>{contact.email_address}</span>
                                    <span>{contact.phone_number}</span>
                                    <span className="text-[#01A2D6] font-extrabold">
                                        {contact.type}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="h-12 pt-8 pb-8 mb-4 flex items-center bg-red-100 text-red-900">
                    <span className="p-4">Nincs kapcsolattartó beállítva!</span>
                </div>
            )}
        </div>
    );
}

export default Contacts;
