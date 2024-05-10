import { useState } from "react";
import { InputPropsT } from "../types/InputPropsT";
import ErrorText from "./ErrorText";

const Select = ({
  handleInputChange,
  name,
  label,
  options,
  value,
  hasInitialRenderPassed,
  rules,
  changeValidity,
}: InputPropsT) => {
  const [error, setError] = useState<string[]>([]);

  const validateData = (name: string): string[] => {
    const error: string[] = [];
    if (rules) {
      if (rules.required) {
        if (!Array.isArray(value) && !value) {
          error.push(`${name} is required`);
        }
      }
    }
    return error;
  };
  return (
    <div key={name}>
      <label>{label}:</label>
      <select
        name={name}
        value={value}
        onChange={(e) => {
          if (hasInitialRenderPassed) {
            const errorArray = validateData(e.target.name);
            changeValidity(e.target.name, errorArray.length > 0 ? false : true);
            setError(errorArray);
          }
          handleInputChange(e.target.name, e.target.value);
        }}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <ErrorText error={error} />}
    </div>
  );
};

export default Select;
