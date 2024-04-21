import React, { useState } from "react";
import "./App.css";
import { schema } from "./constants/schema";
import InputRenderer from "./components/InputRenderer";
import { inputData } from "./constants/checkboxRadioSchema";
import CheckBox from "./components/CheckBox";
import RadioButton from "./components/RadioButton";
import Select from "./components/Select";

function App() {
  const initialState = () => {
    if (schema) {
      return schema.fields.reduce(
        (obj, field) => ({ ...obj, [field.name]: "" }),
        {}
      );
    } else return {};
  };

  const [fields, setFields] = useState<Record<string, string>>(initialState());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleReset = () => {
    alert("Forms cleared to initial state!!");
    setFields(initialState());
  };

  return (
    <>
      <form className="form__container" onReset={handleReset}>
        {schema.fields.map((field) => (
          <InputRenderer
            key={field.name}
            disabled={field.disabled}
            name={field.name}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            value={fields[field.name]}
            type={field.type}
          />
        ))}

        {inputData.map((item) => {
          if (item.multipleSelection.status) {
            return (
              <CheckBox
                key={item.id}
                title={item.title}
                options={item.options}
                disabled={item.disabled}
                required={item.required}
              />
            );
          } else {
            if (item.multipleSelection.elementToUse === "RadioButton") {
              return (
                <RadioButton
                  key={item.id}
                  title={item.title}
                  options={item.options}
                  disabled={item.disabled}
                  required={item.required}
                />
              );
            }
            if (item.multipleSelection.elementToUse === "Select") {
              return (
                <Select
                  key={item.id}
                  title={item.title}
                  options={item.options}
                  disabled={item.disabled}
                  required={item.required}
                />
              );
            }
          }
        })}
        <button className="submit__button" type="reset">
          Reset
        </button>
      </form>
    </>
  );
}

export default App;
