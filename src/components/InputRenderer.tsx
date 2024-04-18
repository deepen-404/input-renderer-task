type InputRendererPropsT = {
  type: "number" | "email" | "text" | "password" | "date";
  placeholder: string;
  required: boolean;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
};

const InputRenderer: React.FC<InputRendererPropsT> = ({
  type = "text",
  placeholder = "Enter a text",
  required = false,
  disabled = false,
  onChange,
  value,
  name = "",
}) => {
  return (
    <div>
      <label className="input__container">
        <span style={{ opacity: disabled ? "0.5" : "1" }}>
          {`${name.toUpperCase()}:`}
        </span>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          value={value}
          onChange={(evt) => onChange(evt)}
        />
      </label>
    </div>
  );
};

export default InputRenderer;
