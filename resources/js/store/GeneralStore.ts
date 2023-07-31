import { create } from "zustand";

type GeneralStoreType = {
    showSidebar: boolean;
    setShowSidebar: () => void;

    isLoading: boolean;
    setLoading: (state: boolean) => void;

    isSubmitted: boolean;
    setSubmitted: (state: boolean) => void;
};

export const useGeneralStore = create<GeneralStoreType>((set) => ({
    showSidebar: false,
    setShowSidebar: () => {
        set((state: any) => ({ showSidebar: !state.showSidebar }));
    },

    isLoading: false,
    setLoading: () => {
        set((state: any) => ({ isLoading: state }));
    },

    isSubmitted: false,
    setSubmitted: () => {
        set((state: any) => ({ isSubmitted: state }));
    },
}));
