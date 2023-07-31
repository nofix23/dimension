import { Company, User } from "@/types";
import { type } from "os";
import { create } from "zustand";

type CompanyStoreType = {
    companyItems: Company[];
    setCompanyItems: (items: any) => void;

    userItems: User[];
    setUserItems: (items: any) => void;

    userProfile: User | null;
    setUserProfile: (item: any) => void;

    active: number;
    setActive: (active: number) => void;

    selectedItem: Company | null;
    setSelectedItem: (item: Company | null) => void;
};

export const useCompanyStore = create<CompanyStoreType>((set) => ({
    companyItems: [],
    setCompanyItems: (items: any) => set({ companyItems: items }),

    userItems: [],
    setUserItems: (items: any) => set({ userItems: items }),

    userProfile: null,
    setUserProfile: (items: any) => set({ userProfile: items }),

    active: -1,
    setActive: (active: number) => set({ active: active }),

    selectedItem: null,
    setSelectedItem: (item: Company | null) => {
        if(typeof item === null){
            set( { selectedItem: null})
        }
        set({ selectedItem: item })
    },
}));
