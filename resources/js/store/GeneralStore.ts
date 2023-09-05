import { create } from "zustand";

type GeneralStoreType = {
    showSidebar: boolean;
    setShowSidebar: () => void;

    isLoading: boolean;
    setLoading: (state: boolean) => void;

    isSubmitted: boolean;
    setSubmitted: (state: boolean) => void;

    headerPalette: string;
    setHeaderPalette: (state: string) => void;
};

export const useGeneralStore = create<GeneralStoreType>((set) => ({
    showSidebar: true,
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

    headerPalette: "",
    setHeaderPalette: () => {
        set((state: any) => ({ headerPalette: state }));
    },
}));
