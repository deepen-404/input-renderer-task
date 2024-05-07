import React, { useEffect, useState } from "react";
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
  const [hasInitialRenderPassed, sethasInitialRenderPassed] = useState(false);

  // in case where default values are not provided, or provided values are not valid
  // we don't want to show the error messages, when the component first renders
  // only after the first render passes, we want to show the error messages
  useEffect(() => {
    sethasInitialRenderPassed(true);
  }, []);

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

  const validateData = (name: string, value: string | string[]): string[] => {
    const rules = formInputs[name].rules;

    // can't use the value from the formInputs like this because
    // we get the old value as state update is async
    // const value = formInputs[name].value;

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
        (Array.isArray(value) || typeof value === "string") &&
        value.length > rules.maxlength
      ) {
        if (typeof value === "string")
          error.push(`${name} must be ${rules.maxlength} characters at most`);
        if (Array.isArray(value))
          error.push(
            `${name} must have at most ${rules.maxlength} options selected`
          );
      }

      if (
        rules.minlength &&
        (Array.isArray(value) || typeof value === "string") &&
        value.length < rules.minlength
      ) {
        if (typeof value === "string")
          error.push(`${name} must be at least ${rules.minlength} long`);
        if (Array.isArray(value))
          error.push(
            `${name} must have at least ${rules.minlength} options selected`
          );
      }

      if (
        rules.min &&
        typeof value === "string" &&
        parseFloat(value) < rules.min
      )
        error.push(`${name} must be greater than or equal to ${rules.min}`);

      if (
        rules.max &&
        typeof value === "string" &&
        parseFloat(value) > rules.max
      )
        error.push(`${name} must be less than or equal to ${rules.max}`);

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

    return error;
  };

  const handleInputChange = (
    name: string,
    value: string | string[],
    error: string[]
  ) => {
    setFormInputs((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], value, error },
    }));
  };

  const isValid = Object.keys(formInputs).every(
    (key) => formInputs[key].error.length === 0
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValid) {
      alert("Form submitted");
    } else {
      alert("Invalid input");
    }
  };

  // problem with JS, it shows the nested arrays without stringyfying the formInputs
  // console.log(JSON.stringify(formInputs));

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {Schema.map((item) => {
        const props = {
          ...item,
          key: item.name,
          value: formInputs[item.name].value,
          error: formInputs[item.name].error,
          handleInputChange,
          validateData,
          hasInitialRenderPassed,
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
