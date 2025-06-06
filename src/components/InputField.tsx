import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  labelAlign?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  labelAlign = "text-left",
  className = "",
  ...props
}) => (
<div className="mb-4">
    <label
        htmlFor={props.id || props.name}
        className={`block font-medium mb-2 ${labelAlign}`}
    >
        {label}
    </label>
    <input
        {...props}
        className={`w-full px-3 py-2 border border-darkgray text-darkgray md:h-[25px] ${className} ${error ? "border-red-500" : ""}`}
    />
    {error && (
        <p className={`text-red-500 text-xs text-${labelAlign}`}>{error}</p>
    )}
</div>
);

export default InputField;