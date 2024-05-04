import { useState } from "react";
import formData from "../constants/newSchema";
import SimpleInput from "./SimpleInput";
import CheckBox from "./CheckBox";
import RadioButton from "./RadioButton";
import Select from "./Select";

export type FormInputsT = Record<string, string | string[]>;

const NewInputRenderer = () => {
  /* 
    FIRST APPROACH to insert the default values direclty from the schema
  */

  // const [formInputs, setFormInputs] = useState<
  //   Record<string, string | string[]>
  // >(() =>
  //   formData.reduce((obj, field) => {
  //     let value: string | string[] = "";

  //     if (field.multipleDefaultValue) {
  //       value = field.multipleDefaultValue;
  //     } else if (field.defaultValue) {
  //       value = field.defaultValue;
  //     }

  //     return { ...obj, [field.name]: value };
  //   }, {})
  // );

  /*
    SECOND APPROACH to insert the default value by the programmer
  */
  const [formInputs, setFormInputs] = useState<FormInputsT>({
    email: "email",
    firstName: "fname",
    lastName: "lastname",
    gender: "male",
    age: "2",
    country: "",
    techStack: ["react"],
  });

  const handleInputChange = (name: string, value: string | string[]) =>
    setFormInputs({ ...formInputs, [name]: value });

  // problem with JS, it shows the nested arrays without stringyfying the formInputs
  console.log(JSON.stringify(formInputs));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Form submitted");
    setFormInputs({
      email: "",
      firstName: "",
      lastName: "",
      gender: "",
      age: "",
      country: "",
      techStack: [],
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {formData.map((item) => {
        const commonProps = {
          ...item,
          key: item.name,
          value: formInputs[item.name],
          handleInputChange,
        };
        if (
          item.type === "email" ||
          item.type === "text" ||
          item.type === "number"
        ) {
          return <SimpleInput {...commonProps} />;
        } else if (item.type === "checkbox") {
          return <CheckBox {...commonProps} />;
        } else if (item.type === "radio") {
          return <RadioButton {...commonProps} />;
        } else if (item.type === "select") {
          return <Select {...commonProps} />;
        }
      })}
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewInputRenderer;
