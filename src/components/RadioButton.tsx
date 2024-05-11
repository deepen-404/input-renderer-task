import { InputPropsT } from "../types/InputPropsT";
import ErrorText from "./ErrorText";

const RadioButton = ({
  handleInputChange,
  name,
  label,
  options,
  type,
  value,
  hasInitialRenderPassed,
  rules,
  errors,
  handleErrors,
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
              if (hasInitialRenderPassed) {
                const errorArray = validateData(e.target.name);
                handleErrors(e.target.name, errorArray);
              }
              handleInputChange(e.target.name, e.target.value);
            }}
            checked={value === option?.value}
          />
          {option.label}
          {errors && <ErrorText error={errors} />}
        </div>
      ))}
    </div>
  );
};

export default RadioButton;
