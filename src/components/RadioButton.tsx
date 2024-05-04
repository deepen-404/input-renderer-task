import { InputPropsT } from "../types/InputPropsT";

const RadioButton = ({
  handleInputChange,
  name,
  label,
  options,
  type,
  value,
}: InputPropsT) => {
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
              handleInputChange(e.target.name, e.target.value);
            }}
            checked={value === option?.value}
          />
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default RadioButton;
