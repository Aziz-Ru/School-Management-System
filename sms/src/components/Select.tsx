const Select = ({
  width,
  label,
  name,
  options,
  setIsStaff,
  disabled,
}: {
  width: string;
  label: string;
  name: string;
  setIsStaff?: (value: boolean) => void;
  options: any[];
  disabled?: boolean;
}) => {
  return (
    <div className={`${width}`}>
      <label htmlFor={label} className="mb-2 block site-txt">
        {label}
      </label>
      <select
        onChange={(e) => {
          setIsStaff && setIsStaff(e.target.value === "Office_Staff");
        }}
        className="w-full mb-3 site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600"
        name={name}
        id={label}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
