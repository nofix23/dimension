import { Company, User } from "@/types";

export const initialValues = () => {
    return {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "admin",
    };
};
