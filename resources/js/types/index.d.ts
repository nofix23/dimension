export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    password: string;
    password_confirmation: string;
    role: string;
    created_at: string;
    header_appearance: string;
    company: Company;
}

export type Company = {
    id: number;
    company_name: string;
    country: string;
    city: string;
    postal_code: string;
    street: string;
    house_number: string;
    door_bell: string;
    email_address: string;
    phone_number: string;
    active: number;
    comment: string;
    created_at: string;
    user_id: number;
    user: User;
};
export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };

    companies: Company[];

    users: User[];
};
