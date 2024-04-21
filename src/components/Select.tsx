import React from "react";
import { option } from "../constants/checkboxRadioSchema";

type SelectButtonPropsT = {
  title: string;
  options: option[];
  onChange: (valueSent: string, mainId: string) => void;
  disabled: boolean;
  required: boolean;
  selectedValue: string;
  mainId: string;
};

const Select: React.FC<SelectButtonPropsT> = ({
  onChange,
  options,
  title,
  disabled = false,
  required = false,
  selectedValue,
  mainId,
}) => {
  return (
    <div>
      <label style={{ display: "block" }}>{title}</label>
      <select
        title={title}
        onChange={(evt) => onChange(evt.target.value, mainId)}
        required={required}
        disabled={disabled}
        value={selectedValue}
        name={title}
      >
        {options.map((opt) => (
          <option key={opt.name} value={opt.name}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
