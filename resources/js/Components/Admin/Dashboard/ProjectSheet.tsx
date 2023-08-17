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
                <SheetContent
                    side="left"
                    className="w-[400px] md:min-w-[800px] bg-white overflow-y-auto"
                >
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
