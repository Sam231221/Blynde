import "./checkbox.css";
import React from "react";

interface CheckboxProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  value,
  checked,
  onChange,
  id,
}) => {
  return (
    <div className="mr-2 checkbox-wrapper-13 flex items-center gap-2 mb-1">
      <input
        type="checkbox"
        value={value}
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label className="ml-2 text-sm font-medium" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
