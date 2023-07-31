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

    selectedItems: any;
    setSelectedItems: (item:Company | null) => void;
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
        if (typeof item === null) {
            set({ selectedItem: null });
        }
        set({ selectedItem: item });
    },

    selectedItems: [],
    setSelectedItems: (selectedRow: Company | null) => {
        set((prevState) => {
            // If selectedRow is null, reset the selectedItems array to an empty array
            if (selectedRow === null) {
                return { selectedItems: [] };
            }

            // If the selectedRow is not already in the selectedItems array, add it
            if (!prevState.selectedItems.some((item:any) => item === selectedRow)) {
                return { selectedItems: [...prevState.selectedItems, selectedRow] };
            }

            // If the selectedRow is already in the selectedItems array, remove it
            return { selectedItems: prevState.selectedItems.filter((item:any) => item !== selectedRow) };
        });
    },

}));
