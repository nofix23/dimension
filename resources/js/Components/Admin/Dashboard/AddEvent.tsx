import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { PropsWithChildren, useState } from "react";

type Props = {
    show: boolean;
    setShow: (value:boolean) => void;
}
function AddEvent({show, setShow}: Props) {

    return (
        <Dialog open={show}>
            <DialogContent className="md:min-w-[700px] bg-white">
                <DialogHeader>
                    <DialogTitle>Esemény hozzáadása naptárhoz!</DialogTitle>
                    <DialogDescription>Kérlek válassz</DialogDescription>
                    <DialogClose onClick={() => setShow(!show)}>
                        Close
                    </DialogClose>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default AddEvent;
