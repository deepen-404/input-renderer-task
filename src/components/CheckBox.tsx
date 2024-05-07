import { InputPropsT } from "../types/InputPropsT";
import ErrorText from "./ErrorText";

const CheckBox = ({
  handleInputChange,
  name,
  label,
  options,
  type,
  value: values,
  error,
}: InputPropsT) => {
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
              handleInputChange(e.target.name, updatedValue);
            }}
            checked={values.includes(option?.value)}
          />
          {option.label}
        </div>
      ))}
      {error && <ErrorText error={error} />}
    </div>
  );
};

export default CheckBox;
