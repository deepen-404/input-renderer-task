import React from "react";
import { option } from "../constants/checkboxRadioSchema";

type CheckBoxPropsT = {
  title: string;
  options: option[];
  onChange: (valueSent: string, mainId: string) => void;
  disabled: boolean;
  required: boolean;
  selectedValues: string[];
  mainId: string;
};

const CheckBox: React.FC<CheckBoxPropsT> = ({
  onChange,
  options,
  title,
  disabled = false,
  required = false,
  selectedValues,
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
                checked={selectedValues.includes(opt.name) ? true : false}
                required={required}
                disabled={disabled}
                type="checkbox"
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

export default CheckBox;
