import React, { useEffect, useState } from "react";
import Schema from "../constants/Schema";
import SimpleInput from "./SimpleInput";
import CheckBox from "./CheckBox";
import RadioButton from "./RadioButton";
import Select from "./Select";

export type FormInputsT = {
  [key: string]: string | string[];
};

type validateFormT = {
  [key: string]: string[];
};

const InputRenderer = () => {
  const [hasInitialRenderPassed, sethasInitialRenderPassed] = useState(false);

  const [formErrors, setFormErrors] = useState<validateFormT>({
    email: [],
    firstName: [],
    lastName: [],
    gender: [],
    age: [],
    country: [],
    techStack: [],
  });

  const [formInputs, setFormInputs] = useState<FormInputsT>({
    email: "email@email.com",
    firstName: "fname",
    lastName: "lastname",
    gender: "male",
    age: "20",
    country: "usa",
    techStack: ["react"],
  });

  // in case where default values are not provided, or provided values are not valid
  // we don't want to show the error messages, when the component first renders
  // only after the first render passes, we want to show the error messages
  useEffect(() => {
    sethasInitialRenderPassed(true);
  }, []);

  const handleInputChange = (name: string, value: string | string[]) => {
    setFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleErrors = (name: string, errors: string[]) => {
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: errors,
    }));
  };

  const validateForm = () =>
    Object.values(formErrors).every((err) => err.length === 0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) alert("Form submitted");
    else alert("Fill all fields properly");
  };

  // problem with JS, it shows the nested arrays without stringyfying the formInputs
  console.log(JSON.stringify(formInputs));
  console.log(JSON.stringify(formErrors));

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {Schema.map((item) => {
        const props = {
          ...item,
          key: item.name,
          value: formInputs[item.name],
          handleInputChange,
          hasInitialRenderPassed,
          handleErrors,
          errors: formErrors[item.name],
        };
        let Component;
        if (
          item.type === "email" ||
          item.type === "text" ||
          item.type === "number"
        )
          Component = SimpleInput;
        else if (item.type === "checkbox") Component = CheckBox;
        else if (item.type === "radio") Component = RadioButton;
        else if (item.type === "select") Component = Select;

        if (Component) return <Component {...props} />;
      })}
      <button type="submit">Submit</button>
    </form>
  );
};

export default InputRenderer;
