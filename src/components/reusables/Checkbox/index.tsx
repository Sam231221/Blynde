import React from "react";
import "./checkbox.css";
const Checkbox = ({ label, value, checked, onChange, id }) => {
  return (
    <div className="mr-2 checkbox-wrapper-13 flex items-center gap-2 mb-1">
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label className="ml-2 text-sm font-medium" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
