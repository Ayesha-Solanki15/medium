import { ChangeEvent } from "react";

interface InputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const Input = ({ label, placeholder, onChange, type }: InputType) => {
  return (
    <div className="w-full flex flex-col gap-0.5">
      <label
        htmlFor={label}
        className="block mb-2 text-md font-semibold text-gray-600 "
      >
        {label}
      </label>
      <input
        type={type || "text"}
        id={label}
        className="w-full p-2 border-2 border-gray-400 rounded-md focus:outline-none 
        focus:ring-2 focus:ring-slate-400 "
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default Input;
