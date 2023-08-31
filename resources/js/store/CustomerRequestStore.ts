import { CustomerRequest } from "@/types";
import { create } from "zustand";

type CustomerRequestStoreType = {
    customerRequestItems: CustomerRequest[];
    setCustomerRequestItems: (items: any) => void;
};

export const useCustomerRequestStore = create<CustomerRequestStoreType>((set) => ({
    customerRequestItems: [],
    setCustomerRequestItems: (items: any) =>
        set({ customerRequestItems: items }),
}));
