import React, { useEffect, useState } from "react";
import Schema from "../constants/Schema";
import SimpleInput from "./SimpleInput";
import CheckBox from "./CheckBox";
import RadioButton from "./RadioButton";
import Select from "./Select";

export type FormInputsT = {
  [key: string]: {
    value: string | string[];
  };
};

type validateFormT = {
  [key: string]: boolean;
};

const InputRenderer = () => {
  const [hasInitialRenderPassed, sethasInitialRenderPassed] = useState(false);

  // default values are provided so, for the first render the form is valid
  const [isFormValid, setIsFormValid] = useState<validateFormT>({
    email: true,
    firstName: true,
    lastName: true,
    gender: true,
    age: true,
    country: true,
    techStack: true,
  });

  const [formInputs, setFormInputs] = useState<FormInputsT>({
    email: { value: "email@email.com" },
    firstName: { value: "fname" },
    lastName: { value: "lastname" },
    gender: { value: "male" },
    age: { value: "20" },
    country: { value: "usa" },
    techStack: { value: ["react"] },
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
      [name]: { ...prevState[name], value },
    }));
  };

  const validateForm = () => Object.values(isFormValid).every((item) => item);

  const changeValidity = (name: string, isValid: boolean) =>
    setIsFormValid((prevState) => ({ ...prevState, [name]: isValid }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) alert("Form submitted");
    else alert("Fill all fields properly");
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
          handleInputChange,
          hasInitialRenderPassed,
          changeValidity,
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
