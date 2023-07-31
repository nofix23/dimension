import { Field } from "formik";
import React from "react";

type PropsType = {
    className?: string;
    id: string;
    name: string;
    type: string;
    required?: boolean;
    placeholder?: string;
    readOnly?: boolean;
    as?: string;
};

function FormikField({
    className,
    id,
    name,
    type,
    required = false,
    placeholder,
    readOnly = false,
    as,
}: PropsType) {
    const fieldClass = `${className} rounded-lg dark:bg-[#010409] dark:text-white h-9 focus:outline-none
    ${readOnly ? "border-2 border-[#CC8513]" : ""}
    `;
    return (
        <Field
            as={as}
            className={fieldClass}
            id={id}
            name={name}
            type={type}
            required={required}
            placeholder={placeholder}
            readOnly={readOnly}
        />
    );
}

export default FormikField;
