import React, { useState } from "react";
import { option } from "../constants/checkboxRadioSchema";

type CheckBoxPropsT = {
  title: string;
  options: option[];
  disabled: boolean;
  required: boolean;
};

const CheckBox: React.FC<CheckBoxPropsT> = ({
  options,
  title,
  disabled = false,
  required = false,
}) => {
  const [checkboxValue, setCheckboxValue] = useState<string[]>([
    options[0].name,
  ]);

  const handleChangeCheckbox = (valueSent: string) => {
    const reqIndex = checkboxValue.findIndex((item) => item === valueSent);
    let updatedData = [...checkboxValue];
    if (reqIndex === -1) {
      updatedData.push(valueSent);
    } else {
      updatedData = updatedData.filter((item) => item !== valueSent);
    }
    setCheckboxValue(updatedData);
  };
  console.log(checkboxValue);

  return (
    <div>
      <label>
        <span style={{ opacity: disabled ? "0.5" : "1" }}>{title}</span>
        <div>
          {options.map((opt) => (
            <label key={opt.id}>
              <input
                checked={checkboxValue.includes(opt.name) ? true : false}
                required={required}
                disabled={disabled}
                type="checkbox"
                value={opt.name}
                onChange={(evt) => handleChangeCheckbox(evt.target.value)}
              />

              <span style={{ opacity: disabled ? "0.5" : "1" }}>
                {opt.name}
              </span>
            </label>
          ))}
        </div>
      </label>
    </div>
  );
};

export default CheckBox;
