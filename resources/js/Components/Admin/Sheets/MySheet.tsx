import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import { useGeneralStore } from "@/store/GeneralStore";
import { PropsWithChildren, useEffect, useState } from "react";

type SheetType = {
    trigger: string;
    side: "left" | "right" | "top" | "bottom";
    title: string;
};
function MySheet({
    children,
    trigger,
    side,
    title,
}: PropsWithChildren<SheetType>) {

    return (
        <div>
            <Sheet>
                <SheetTrigger>{trigger}</SheetTrigger>

                <SheetContent side={side} className="bg-white md:min-w-[800px]">
                    <SheetHeader>
                        <SheetTitle className="mb-3">{title}</SheetTitle>
                        <SheetDescription>{children}</SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default MySheet;
