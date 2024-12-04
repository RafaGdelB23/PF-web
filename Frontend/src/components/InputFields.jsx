import React from "react";

const InputField = ({
  name,
  label,
  id,
  value,
  onChange,
  type = "text",
  required = false,
  as = "input",
  placeholder
}) => {
  const Component = as === "textarea" ? "textarea" : "input";

  return (
    <div>
      <label htmlFor={id} className="Label-fields">
        {label}
      </label>
      <Component
        id={id}
        value={value}
        type={type}
        onChange={onChange}
        required={required}
        name={name}
        placeholder={placeholder} 
        rows={as === "textarea" ? 4 : undefined}
      />
    </div>
  );
};

export default InputField;
