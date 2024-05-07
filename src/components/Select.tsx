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
  validateData,
}: InputPropsT) => {
  return (
    <div key={name}>
      <label>{label}:</label>
      <select
        name={name}
        value={value}
        onChange={(e) => {
          let err: string[] = [];
          if (hasInitialRenderPassed) {
            err = validateData(e.target.name, e.target.value);
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
