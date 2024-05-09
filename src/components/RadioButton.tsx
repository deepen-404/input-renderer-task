import { InputPropsT } from "../types/InputPropsT";
import ErrorText from "./ErrorText";

const RadioButton = ({
  handleInputChange,
  name,
  label,
  options,
  type,
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
      {options?.map((option) => (
        <div key={option.value}>
          <input
            type={type}
            name={name}
            value={option.value}
            onChange={(e) => {
              let err: string[] = [];
              if (hasInitialRenderPassed) {
                err = validateData(e.target.name);
              }
              handleInputChange(e.target.name, e.target.value, err);
            }}
            checked={value === option?.value}
          />
          {option.label}
          {error && <ErrorText error={error} />}
        </div>
      ))}
    </div>
  );
};

export default RadioButton;
