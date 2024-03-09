import { ChangeEvent } from "react";

type LabelledInputComponent = {
  label: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

export const LabelledInput = ({
  label,
  placeholder,
  onChange,
  type = "text",
}: LabelledInputComponent) => {
  return (
    <div className="">
      <label className="block mb-2 text-base font-bold">{label}</label>
      <input
        type={type}
        className=" border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block lg:w-[420px] w-[300px] p-2.5 font-medium"
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
};
