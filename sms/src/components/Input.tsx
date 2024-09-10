import { useState } from "react";

const Input = ({
  type,
  name,
  placeholder,
  width,
  label,
  required,
}: {
  type: string;
  name: string;
  width: string;
  placeholder: string;
  required: boolean;
  label: string;
}) => {
  const [inputType, setInputType] = useState(type);
  return (
    <div className={`${width}`}>
      <label htmlFor={label} className="mb-2 block site-txt">
        {label}
      </label>
      <input
        className="w-full mb-3 site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600 "
        type={inputType}
        name={name}
        id={label}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;
