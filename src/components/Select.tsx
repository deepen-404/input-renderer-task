import { InputPropsT } from "../types/InputPropsT";
import ErrorText from "./ErrorText";

const Select = ({
  handleInputChange,
  name,
  label,
  options,
  value,
  error,
  hasInitialRenderPassed,
  rules,
}: InputPropsT) => {
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
          let err: string[] = [];
          if (hasInitialRenderPassed) {
            err = validateData(e.target.name);
          }
          handleInputChange(e.target.name, e.target.value, err);
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
