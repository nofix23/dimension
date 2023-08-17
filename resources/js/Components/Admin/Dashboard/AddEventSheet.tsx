import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
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
                        <SheetTitle>Új esemény hozzáadása a naptárhoz!</SheetTitle>
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
