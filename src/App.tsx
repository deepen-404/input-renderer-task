import React, { useState } from "react";
import "./App.css";
import { schema } from "./constants/schema";
import InputRenderer from "./components/InputRenderer";

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(fields);
    setFields(initialState());
  };

  if (!schema) return <p>Schema not found</p>;

  return (
    <>
      <form className="form__container" onSubmit={handleSubmit}>
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
        <button className="submit__button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default App;
