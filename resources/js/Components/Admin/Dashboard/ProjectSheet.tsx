import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/ui/sheet';
import { PropsWithChildren } from 'react';

type Props = {
    projectId: string;
};

function ProjectSheet({ projectId, children }: PropsWithChildren<Props>) {

    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>{children}</SheetTrigger>
                <SheetContent side="top" className="bg-white w-[400px] sm:w-[1400px] h-3/4">
                    <SheetHeader>
                        <SheetTitle>{projectId}</SheetTitle>
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

export default ProjectSheet
