import { Company } from "@/types";

export const initialValues = (initValues: Company | null) => {
    return {
        id: initValues?.id,
        company_name: initValues?.company_name,
        country: initValues?.country,
        city: initValues?.city,
        postal_code: initValues?.postal_code,
        street: initValues?.street,
        house_number: initValues?.house_number,
        door_bell: initValues?.door_bell,
        email_address: initValues?.email_address,
        phone_number: initValues?.phone_number,
        website: initValues?.website,
        active: initValues?.active,
        comment: initValues?.comment,
        ranking: initValues?.ranking,
        user_id: initValues?.user_id,
        user: initValues?.user
    };
};
