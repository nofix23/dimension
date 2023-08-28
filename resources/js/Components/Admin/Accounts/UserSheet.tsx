import { Button } from "@/Components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import { User } from "@/types";
import { UserIcon } from "@heroicons/react/24/outline";
import { PropsWithChildren, ReactNode, useState } from "react";
import UserDropdown from "./UserDropdown";
import AccountData from "./AccountData";
import CompanyData from "./CompanyData";
import ProjectsData from "./ProjectsData";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import { Toaster } from "@/Components/ui/toaster";

type Props = {
    side: "left" | "right" | "top" | "bottom";
    user: User;
    users: User[];
};

function UserSheet({ side, user, users, children }: PropsWithChildren<Props>) {
    const [showSheet, setShowSheet] = useState<boolean>(false);

    return (
        <div>
            <Sheet
                open={showSheet}
                onOpenChange={() => setShowSheet(!showSheet)}
            >
                <SheetTrigger asChild>{children}</SheetTrigger>
                <SheetContent
                    className="w-[400px] md:min-w-[800px] bg-white overflow-y-auto"
                    side={side}
                >
                    <SheetHeader>
                        <SheetTitle>
                            <div className="flex flex-row items-center gap-5 border-b p-2">
                                <UserIcon className="h-10" />
                                <span className="text-3xl font-bold">
                                    {user.name}
                                </span>
                                <UserDropdown
                                    user={user}
                                    showFeet={showSheet}
                                    setShowSheet={() => setShowSheet(showSheet)}
                                />
                            </div>
                        </SheetTitle>
                        <SheetDescription>
                            <div className="mt-10 flex flex-col gap-14">
                                <Accordion
                                    type="multiple"
                                    defaultValue={["item-1"]}
                                >
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className="max-w-[100px]">
                                            <div>Profil</div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <AccountData user={user} />
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                                {user.company && (
                                    <div className="flex flex-col gap-14">
                                        <Accordion type="multiple">
                                            <AccordionItem value="item-2">
                                                <AccordionTrigger className="max-w-[100px]">
                                                    <div>Cég</div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <CompanyData
                                                        user={user}
                                                        users={users}
                                                    />
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>

                                        <Accordion type="multiple">
                                            <AccordionItem value="item-3">
                                                <AccordionTrigger className="max-w-[100px]">
                                                    <div>Projektek</div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <ProjectsData user={user} />
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                )}
                            </div>
                        </SheetDescription>
                    </SheetHeader>
                    <Toaster />
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default UserSheet;
