import { CustomerRequest } from "@/types";
import { create } from "zustand";

type CustomerRequestStoreType = {
    customerRequestItems: CustomerRequest[];
    setCustomerRequestItems: (items: any) => void;
    selectedItem: any;
    setSelectedItem: (item: CustomerRequest | null) => void;
};

export const useCustomerRequestStore = create<CustomerRequestStoreType>((set) => ({
    customerRequestItems: [],
    setCustomerRequestItems: (items: any) =>
        set({ customerRequestItems: items }),
    selectedItem: null,
    setSelectedItem: (item: CustomerRequest | null) => {
        if (typeof item === null) {
            set({ selectedItem: null });
        }
        set({ selectedItem: item });
    },
}));
