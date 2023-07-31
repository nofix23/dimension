export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    password: string;
    password_confirmation: string;
    role: string;
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
