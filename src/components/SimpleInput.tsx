import { useState } from "react";
import { InputPropsT } from "../types/InputPropsT";
import ErrorText from "./ErrorText";

const SimpleInput = ({
  name,
  type,
  label,
  rules,
  value,
  handleInputChange,
  hasInitialRenderPassed,
}: InputPropsT) => {
  const [error, setError] = useState<string[]>([]);
  const validateData = (name: string, value: string | string[]): string[] => {
    const error: string[] = [];

    if (rules) {
      if (rules.required) {
        if (!Array.isArray(value) && !value) {
          error.push(`${name} is required`);
        }
      }

      if (
        rules.maxlength &&
        typeof value === "string" &&
        value.length > rules.maxlength
      ) {
        error.push(`${name} must be ${rules.maxlength} characters at most`);
      }

      if (
        rules.minlength &&
        typeof value === "string" &&
        value.length < rules.minlength
      ) {
        if (typeof value === "string")
          error.push(`${name} must be at least ${rules.minlength} long`);
      }

      if (
        rules.min &&
        typeof value === "string" &&
        parseFloat(value) < rules.min
      )
        error.push(`${name} must be greater than or equal to ${rules.min}`);

      if (
        rules.max &&
        typeof value === "string" &&
        parseFloat(value) > rules.max
      )
        error.push(`${name} must be less than or equal to ${rules.max}`);

      if (
        rules.pattern &&
        typeof value === "string" &&
        !new RegExp(rules.pattern).test(value)
      ) {
        error.push(`${name} does not match the required pattern`);
      }
    }
    return error;
  };
  return (
    <div style={{ marginBlock: "0.5rem" }} key={name}>
      <label style={{ display: "block" }} htmlFor={name}>
        {rules?.required && <span style={{ color: "red" }}>*</span>}
        {label}:
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => {
          if (hasInitialRenderPassed) {
            setError(validateData(e.target.name, e.target.value));
          }
          handleInputChange(e.target.name, e.target.value);
        }}
        disabled={rules?.disabled ?? false}
      />
      {error && <ErrorText error={error} />}
    </div>
  );
};

export default SimpleInput;
