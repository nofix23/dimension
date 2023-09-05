import { ActivityLog, CustomerRequest } from "@/types";
import { create } from "zustand";

type ActivityLogStoreType = {
    activityLogItems: ActivityLog[];
    setActivityLogItems: (items: any) => void;
};

export const useActivityLogStore = create<ActivityLogStoreType>((set) => ({
    activityLogItems: [],
    setActivityLogItems: (items: any) => set({ activityLogItems: items }),

}));
