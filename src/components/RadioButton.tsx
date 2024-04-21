import React from "react";
import { option } from "../constants/checkboxRadioSchema";

type RadioButtonPropsT = {
  title: string;
  options: option[];
  onChange: (valueSent: string, mainId: string) => void;
  disabled: boolean;
  required: boolean;
  selectedValue: string;
  mainId: string;
};

const RadioButton: React.FC<RadioButtonPropsT> = ({
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
      <label>
        <span style={{ opacity: disabled ? "0.5" : "1" }}>{title}</span>
        <div>
          {options.map((opt) => (
            <label key={opt.id}>
              <input
                checked={opt.name === selectedValue}
                required={required}
                disabled={disabled}
                type="radio"
                value={opt.name}
                onChange={(evt) => onChange(evt.target.value, mainId)}
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
