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
    company_id: number;
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
    website: string;
    active: number;
    comment: string;
    ranking: number;
    created_at: string;
    user_id: number;
    user: User;
    contacts: CompanyContact[];
};

export type CompanyContact = {
    id: number;
    company_id: number;
    name: string;
    phone_number: string;
    secondary_phone_number: string;
    email_address: string;
    type: string;
    image_url: string;
};

export type CustomerRequest = {
    accept: number;
    accepted_by: string;
    accepted_at: string;
    reverted_by: string;
    reverted_at: string;
    rejected_by: string;
    rejected_at: string;
    reject_comment: string;
    subject: string;
    materials: string;
    sizes: string;
    name: string;
    email_address: string;
    phone_number: string;
    comments: string;
    status: number;
    user_id: number;
    shipping: number;
    country: string;
    city: string;
    postal_code: string;
    street_number: string;
    house_number: string;
    door_bell: string;
    created_at: string;
    updated_at: string;
}

export type ActivityLog = {
    id: number;
    log_name: string;
    description: string;
    subject_type: string;
    subject_id: number;
    causer_type: string;
    causer_id: number;
    properties: string;
    created_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> =
    T & {
        auth: {
            user: User;
        };

        companies: Company[];

        users: User[];

        customer_requests: CustomerRequest[];

        activities: ActivityLog[];
    };
