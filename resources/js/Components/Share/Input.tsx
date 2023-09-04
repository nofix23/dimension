import React from 'react'
import { twMerge } from 'tailwind-merge';

type Props = {
    type: "text" | "textarea" | "select" | "number" | "email" | "file";
    className?: string;
    value?: any;
    onChange?: (e:any) => void;
}
function Input( { type, className, value, onChange,  ...props} : Props) {
  return type != "textarea" ? (
      <input
          {...props}
          value={value}
          onChange={onChange}
          className={twMerge(
              "hover:bg-gray-50 text-[#01A2D6] font-bold p-3 rounded-lg h-9 focus:outline-none bg-gray-50 pl-3",
              className
          )}
          type={type}
      />
  ) : (
      <textarea
          {...props}
          value={value}
          onChange={onChange}
          className={twMerge(
              "hover:bg-gray-50 text-[#01A2D6] font-bold p-3 h-32 rounded-lg focus:outline-none bg-gray-50 pl-3",
              className
          )}
      />
  );
}

export default Input
