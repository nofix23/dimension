import { User } from "@/types";
import { create } from "zustand";

type UserStoreType = {
    userItems: User[];
    setUserItems: (items: any) => void;

};

export const useUserStore = create<UserStoreType>((set) => ({
    userItems: [],
    setUserItems: (items: any) => set({ userItems: items }),
}));
