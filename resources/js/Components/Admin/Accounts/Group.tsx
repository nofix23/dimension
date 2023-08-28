import { User } from "@/types";
import { EyeIcon, PlusIcon } from "lucide-react";
import CreateProfile from "../Forms/CreateProfile";
import UserSheet from "./UserSheet";

type Props = {
    groupName: string;
    users: User[];
};
function Group({ groupName, users }: Props) {

    return (
        <div className="flex flex-col w-[250px]">
            <div>
                <div className="border-b pt-2 pb-2 flex flex-row justify-center items-center">
                    <span className="font-extralight">
                        {groupName} ({users.length})
                    </span>
                </div>
                {users.map((user: User) => (
                    <div className="group/item">
                        <div className="pt-3 cursor-pointer hover:font-bold hover:text-[#01A2D6] flex flex-row justify-center gap-3 text-[#01A2D6]">
                            <UserSheet side="left" user={user} users={users}>
                                <div className="flex flex-row gap-3 items-center">
                                    <div className="group/edit invisible group-hover/item:visible text-[#01A2D6]">
                                        <EyeIcon className="group-hover/edit h-5 " />
                                    </div>

                                    <span>{user.name}</span>
                                </div>
                            </UserSheet>
                        </div>
                    </div>
                ))}
                <div className="ml-3 pt-3 flex flex-row justify-center">
                    <span className="cursor-pointer text-gray-400 hover:text-[#01A2D6]">
                        <CreateProfile triggerText="" TriggerIcon={PlusIcon} />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Group;
