import { router, useForm } from "@inertiajs/react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/UserStore";
import { User } from "@/types";

function ActivityFilter() {
    const { data, setData, get, processing, errors } = useForm({
        user_id: "",
    });

    const { userItems } = useUserStore();

    function submit(e: any) {
        get(`activity?user=${data.user_id}`);
    }

    return (
        <div className="mt-8">
            <form
                onSubmit={submit}
                className="flex flex-col justify-start items-start w-xl"
            >
                <div className="flex flex-col justify-start items-start gap-2">
                    <select
                        name="user"
                        className="pt-4 pb-4 pl-2 border-slate-100 border-2"
                        value={data.user_id}
                        onChange={(e) => setData("user_id", e.target.value)}
                    >
                        <option value="null">- Felhasználó -</option>
                        {userItems.map((item:User) => (
                            <option value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-center mt-5">
                    <Button className="bg-[#01A2D6] hover:bg-blue-400 text-white">
                        Szűrés
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ActivityFilter;
