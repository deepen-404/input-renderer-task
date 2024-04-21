import React, { useState } from "react";
import { option } from "../constants/checkboxRadioSchema";

type SelectButtonPropsT = {
  title: string;
  options: option[];
  disabled: boolean;
  required: boolean;
  fieldUpdater: (id: string, value: string) => void;
  id: string;
};

const Select: React.FC<SelectButtonPropsT> = ({
  options,
  title,
  disabled = false,
  required = false,
  fieldUpdater,
  id,
}) => {
  const [selectValue, setSelectValue] = useState<string>("");

  const handleChangeSelect = (value: string) => {
    setSelectValue(value);
    fieldUpdater(id, value);
  };
  return (
    <div>
      <label style={{ display: "block" }}>{title}</label>
      <select
        title={title}
        onChange={(evt) => handleChangeSelect(evt.target.value)}
        required={required}
        disabled={disabled}
        value={selectValue}
        name={title}
      >
        <option value="">Select District</option>
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
