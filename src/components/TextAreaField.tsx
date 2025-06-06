import React from "react";

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  labelAlign?: string;
}

const TextAreaField: React.FC<TextareaFieldProps> = ({
  label,
  error,
  labelAlign = "text-left",
  className = "",
  ...props
}) => (
  <div className="mb-4">
    <label
      htmlFor={props.id || props.name}
      className={`block text-sm font-medium mb-2 ${labelAlign}`}
    >
      {label}
    </label>
    <textarea
      {...props}
      className={`w-full px-3 py-2 border border-darkgray text-darkgray ${className} ${error ? "border-red-500" : ""}`}
    />
    {error && (
      <p className={`text-red-500 text-xs text-${labelAlign}`}>{error}</p>
    )}
  </div>
);

export default TextAreaField;