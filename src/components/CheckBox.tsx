import { InputPropsT } from "../types/InputPropsT";
import ErrorText from "./ErrorText";

const CheckBox = ({
  handleInputChange,
  name,
  label,
  options,
  type,
  value: values,
  rules,
  hasInitialRenderPassed,
  errors,
  handleErrors,
}: InputPropsT) => {
  const validateData = (name: string, value: string | string[]): string[] => {
    const error: string[] = [];
    if (rules) {
      if (rules.required) {
        if (Array.isArray(value) && value.length === 0) {
          error.push(`${name} is required`);
        }
      }

      if (
        rules.maxlength &&
        Array.isArray(value) &&
        value.length > rules.maxlength
      ) {
        error.push(
          `${name} must have at most ${rules.maxlength} options selected`
        );
      }

      if (
        rules.minlength &&
        Array.isArray(value) &&
        value.length < rules.minlength
      ) {
        error.push(
          `${name} must have at least ${rules.minlength} options selected`
        );
      }
    }
    return error;
  };

  const handleCheckbox = (value: string): string[] => {
    const existingValues = values || [];
    const isChecked = existingValues.includes(value);
    if (Array.isArray(existingValues)) {
      if (isChecked) {
        return existingValues.filter((item) => item !== value);
      } else {
        return [...existingValues, value];
      }
    }
    return [];
  };
  return (
    <div key={name}>
      <label htmlFor={name}>{label}:</label>
      {options?.map((option) => (
        <div key={option.value}>
          <input
            id={option.label}
            type={type}
            name={name}
            value={option.value}
            onChange={(e) => {
              const updatedValue = handleCheckbox(e.target.value);
              if (hasInitialRenderPassed) {
                const errorArray = validateData(e.target.name, updatedValue);
                handleErrors(e.target.name, errorArray);
              }
              handleInputChange(e.target.name, updatedValue);
            }}
            checked={values.includes(option?.value)}
          />
          {option.label}
        </div>
      ))}
      {errors && <ErrorText error={errors} />}
    </div>
  );
};

export default CheckBox;
