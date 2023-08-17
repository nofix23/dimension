import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { PropsWithChildren } from "react";

type Props = {
    show: boolean;
    setShow: (value: boolean) => void;
};

function AddEventSheet({ show, setShow, children }: PropsWithChildren<Props>) {
    return (
        <div>
            <Sheet open={show} onOpenChange={() => setShow(false)}>
                <SheetContent
                    side="right"
                    className="w-[400px] md:min-w-[800px] bg-white overflow-y-auto"
                >
                    <SheetHeader>
                        <SheetTitle>
                            <div className="flex flex-row items-center gap-5 border-b p-2">
                                <CalendarDaysIcon className="h-10" />
                                <span className="text-3xl font-bold">
                                    Új esemény hozzáadása naptárhoz
                                </span>

                            </div>
                        </SheetTitle>
                        <SheetDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default AddEventSheet;
