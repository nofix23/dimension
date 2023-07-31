import { Company, User } from "@/types";

export const initialValues = (initValues: User | null) => {
    return {
        id: initValues?.id,
        name: initValues?.name,
        email: initValues?.email,
        role: initValues?.role,
    };
};
