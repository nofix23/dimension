import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/ui/sheet';
import { PropsWithChildren } from 'react';
import UserDropdown from '../Accounts/UserDropdown';
import { WorkflowIcon } from 'lucide-react';
import { QueueListIcon } from '@heroicons/react/24/outline';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';

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
                        <SheetTitle>
                            <div className="flex flex-row items-center gap-5 border-b p-2">
                                <RocketLaunchIcon className="h-10" />
                                <span className="text-3xl font-bold">
                                    {projectId}
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

export default ProjectSheet
