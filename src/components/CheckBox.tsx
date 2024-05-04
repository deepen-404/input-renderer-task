import { InputPropsT } from "../types/InputPropsT";

const CheckBox = ({
  formInputs,
  handleInputChange,
  name,
  label,
  options,
  type,
}: InputPropsT) => {
  const handleCheckbox = (value: string, name: string): string[] => {
    const formInputsCopy = formInputs;
    const requiredItem = formInputsCopy[name];
    if (Array.isArray(requiredItem)) {
      return requiredItem.includes(value)
        ? requiredItem.filter((item) => item != value)
        : [...requiredItem, value];
    }
    return [];
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
              const updatedValue = handleCheckbox(
                e.target.value,
                e.target.name
              );
              handleInputChange(e.target.name, updatedValue);
            }}
            checked={formInputs[name].includes(option?.value)}
          />
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default CheckBox;
