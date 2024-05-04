import { InputPropsT } from "../types/InputPropsT";

const SimpleInput = ({
  name,
  type,
  label,
  rules,
  formInputs,
  handleInputChange,
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
        value={formInputs[name]}
        onChange={(e) => {
          handleInputChange(e.target.name, e.target.value);
        }}
        required={rules?.required ?? true}
        disabled={rules?.disabled ?? false}
      />
    </div>
  );
};

export default SimpleInput;
