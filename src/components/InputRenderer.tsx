import React, { useEffect, useState } from "react";
import Schema, { RulesT } from "../constants/Schema";
import SimpleInput from "./SimpleInput";
import CheckBox from "./CheckBox";
import RadioButton from "./RadioButton";
import Select from "./Select";

const emptyErr = { error: [] };

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

  const [formInputs, setFormInputs] = useState<FormInputsT>({
    email: { value: "email@email.com", ...emptyErr },
    firstName: { value: "fname", ...emptyErr },
    lastName: { value: "lastname", ...emptyErr },
    gender: { value: "male", ...emptyErr },
    age: { value: "20", ...emptyErr },
    country: { value: "usa", ...emptyErr },
    techStack: { value: ["react"], ...emptyErr },
  });

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

  // const handleError = (name: string, err: string[]) => {
  //   setFormInputs((prevState) => ({
  //     ...prevState,
  //     [name]: { ...prevState[name], error: [...prevState[name].error, ...err] },
  //   }));
  // };

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
          // handleError,
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
