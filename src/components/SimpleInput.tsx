import { InputPropsT } from "../types/InputPropsT";
import ErrorText from "./ErrorText";

const SimpleInput = ({
  name,
  type,
  label,
  rules,
  value,
  handleInputChange,
  error,
}: InputPropsT) => {
  return (
    <div style={{ marginBlock: "0.5rem" }} key={name}>
      <label style={{ display: "block" }} htmlFor={name}>
        {rules?.required && <span style={{ color: "red" }}>*</span>}
        {label}:
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => {
          handleInputChange(e.target.name, e.target.value);
        }}
        disabled={rules?.disabled ?? false}
      />
      {error && <ErrorText error={error} />}
    </div>
  );
};

export default SimpleInput;
