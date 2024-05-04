import { InputPropsT } from "../types/InputPropsT";

const Select = ({
  formInputs,
  handleInputChange,
  name,
  label,
  options,
}: InputPropsT) => {
  return (
    <div key={name}>
      <label>{label}:</label>
      <select
        name={name}
        value={formInputs[name] || ""}
        onChange={(e) => handleInputChange(name, e.target.value)}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
