import React, { useState } from "react";
import Schema, { RulesT } from "../constants/Schema";
import SimpleInput from "./SimpleInput";
import CheckBox from "./CheckBox";
import RadioButton from "./RadioButton";
import Select from "./Select";

export type FormInputsT = {
  [key: string]: {
    error: string[];
    value: string | string[];
    rules?: RulesT;
  };
};

const InputRenderer = () => {
  /* 
    FIRST APPROACH to insert the default values direclty from the schema
  */

  const [formInputs, setFormInputs] = useState<FormInputsT>(() =>
    Schema.reduce((obj, field) => {
      let value: string | string[] = "";
      let rules: RulesT = {};

      if (field.multipleDefaultValue) value = field.multipleDefaultValue;
      else if (field.defaultValue) value = field.defaultValue;
      if (field.rules) rules = { ...field.rules };

      return {
        ...obj,
        [field.name]: {
          error: [],
          value,
          rules,
        },
      };
    }, {})
  );

  /*
    SECOND APPROACH to insert the default value by the programmer
  */

  /*
    this approach makes it impossible to add rules to the input fields so, we are using the first approach
  */

  // const createInitialState = (value: string | string[]) => ({
  //   error: "",
  //   value,
  // });

  // const [formInputs, setFormInputs] = useState<FormInputsT>({
  //   email: createInitialState("email"),
  //   firstName: createInitialState("fname"),
  //   lastName: createInitialState("lname"),
  //   gender: createInitialState("male"),
  //   age: createInitialState("2"),
  //   country: createInitialState("india"),
  //   techStack: createInitialState(["react"]),
  // });

  const handleInputChange = (name: string, value: string | string[]) =>
    setFormInputs((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], value, error: [] }, // Reset error when input changes
    }));

  const validateInput = (name: string, value: string | string[]): boolean => {
    const rules = formInputs[name].rules;
    const error: string[] = [];

    if (rules) {
      if (rules.required) {
        if (Array.isArray(value) && value.length === 0) {
          error.push(`${name} is required`);
        } else if (!Array.isArray(value) && !value) {
          error.push(`${name} is required`);
        }
      }

      if (
        rules.maxlength &&
        Array.isArray(value) &&
        value.length > rules.maxlength
      ) {
        error.push(
          `${name} must have at most ${rules.maxlength} options selected`
        );
      }

      if (
        rules.minlength &&
        Array.isArray(value) &&
        value.length < rules.minlength
      ) {
        error.push(
          `${name} must have at least ${rules.minlength} options selected`
        );
      }

      if (rules.min && typeof value === "string" && value.length < rules.min) {
        8;
        error.push(`${name} must be greater than or equal to ${rules.min}`);
      }

      if (rules.max && typeof value === "string" && value.length > rules.max) {
        error.push(`${name} must be less than or equal to ${rules.max}`);
      }

      if (
        rules.pattern &&
        typeof value === "string" &&
        !new RegExp(rules.pattern).test(value)
      ) {
        error.push(`${name} does not match the required pattern`);
      }
    }

    setFormInputs((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], error },
    }));

    return error.length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    Object.keys(formInputs).forEach((key) => {
      const isInputValid = validateInput(key, formInputs[key].value);
      if (!isInputValid) {
        isValid = false;
      }
    });

    if (isValid) {
      alert("Form submitted");
    }
  };

  // problem with JS, it shows the nested arrays without stringyfying the formInputs
  console.log(JSON.stringify(formInputs));

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {Schema.map((item) => {
        const props = {
          ...item,
          key: item.name,
          value: formInputs[item.name].value,
          error: formInputs[item.name].error,
          handleInputChange,
        };
        let Component;
        if (
          item.type === "email" ||
          item.type === "text" ||
          item.type === "number"
        ) {
          Component = SimpleInput;
        } else if (item.type === "checkbox") Component = CheckBox;
        else if (item.type === "radio") Component = RadioButton;
        else if (item.type === "select") Component = Select;

        if (Component) return <Component {...props} />;
      })}
      <button type="submit">Submit</button>
    </form>
  );
};

export default InputRenderer;
