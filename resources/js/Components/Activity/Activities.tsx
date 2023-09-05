import { useActivityLogStore } from "@/store/ActivityLogStore";
import { useUserStore } from "@/store/UserStore";
import { ActivityLog, User } from "@/types";
import ActivityFilter from "./ActivityFilter";

function Activities() {
    const { activityLogItems } = useActivityLogStore();

    const { userItems } = useUserStore();

    const findUserName = (item: ActivityLog) => {
        const user = userItems?.find((i) => i.id === item.causer_id);
        return user ? user.name : "";
    };

    return (
        <div className="bg-white md:w-[1400px] p-8 rounded-xl shadow-lg shadow-slate-200">
            <div className="border-b border-slate-200 p-4">
                <span className="text-xl">Felhasználói aktivitás</span>
            </div>

            <ActivityFilter />
            
            <div className="flex flex-col gap-6 mt-8">
                {activityLogItems.map((item: ActivityLog) => (
                    <div className="flex flex-row items-center gap-6">
                        <div className="p-2 bg-slate-50">
                            <span>
                                {new Date(item.created_at).toLocaleString()}
                            </span>
                        </div>
                        <span className="text-[#01A2D6] font-bold">
                            {findUserName(item)}
                        </span>
                        <span className="italic">{item.description}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Activities;
