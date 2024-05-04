import { InputPropsT } from "../types/InputPropsT";

const Select = ({
  handleInputChange,
  name,
  label,
  options,
  value,
}: InputPropsT) => {
  return (
    <div key={name}>
      <label>{label}:</label>
      <select
        name={name}
        value={value}
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
