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
  hasInitialRenderPassed,
  validateData,
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
          let err: string[] = [];
          if (hasInitialRenderPassed) {
            err = validateData(e.target.name, e.target.value);
          }
          handleInputChange(e.target.name, e.target.value, err);
        }}
        disabled={rules?.disabled ?? false}
      />
      {error && <ErrorText error={error} />}
    </div>
  );
};

export default SimpleInput;
