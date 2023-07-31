import { Field } from "formik";
import React from "react";

type PropsType = {
    className?: string;
    type: string;
    id: string;
    name: string;
    required?: boolean;
    placeholder?: string;
    readOnly?: boolean;
    as?: "input" | "select" | "textarea";
};

function FormikField({
    className,
    type,
    id,
    name,
    required = false,
    placeholder,
    readOnly = false,
    as="input",
}: PropsType) {
    const fieldClass = `${className} rounded-lg h-9 focus:outline-none
    ${readOnly ? "border-2 border-[#CC8513]" : ""}
    `;
    return (
        <Field
            as={as}
            type={type}
            className={fieldClass}
            id={id}
            name={name}
            required={required}
            placeholder={placeholder}
            readOnly={readOnly}
        />
    );
}

export default FormikField;
