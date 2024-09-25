const Input = ({
  type,
  name,
  label,
  required,
}: {
  type: string;
  name: string;
  required: boolean;
  label: string;
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={label}
        name={name}
        required={required}
        placeholder=""
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500  focus:ring-0 focus:border-blue-600 peer"
      />
      <label
        htmlFor={label}
        className="absolute text-sm text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
