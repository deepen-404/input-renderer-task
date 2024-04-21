import React, { useState } from "react";
import { option } from "../constants/checkboxRadioSchema";

type RadioButtonPropsT = {
  title: string;
  options: option[];
  disabled: boolean;
  required: boolean;
};

const RadioButton: React.FC<RadioButtonPropsT> = ({
  options,
  title,
  disabled = false,
  required = false,
}) => {
  const [radioValue, setRadioValue] = useState<string>("");

  const handleChangeRadio = (value: string) => {
    setRadioValue(value);
  };

  return (
    <div>
      <label>
        <span style={{ opacity: disabled ? "0.5" : "1" }}>{title}</span>
        <div>
          {options.map((opt) => (
            <label key={opt.id}>
              <input
                checked={opt.name === radioValue}
                required={required}
                disabled={disabled}
                type="radio"
                value={opt.name}
                onChange={(evt) => handleChangeRadio(evt.target.value)}
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

export default RadioButton;
