import { useState } from "react";
import formData from "../constants/newSchema";

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
  const [formInputs, setFormInputs] = useState<
    Record<string, string | string[]>
  >({
    email: "email",
    firstName: "fname",
    lastName: "lastname",
    gender: "male",
    age: "2",
    country: "",
    techStack: [],
  });

  const handleInputChange = (name: string, value: string, type?: string) => {
    if (type !== "checkbox") {
      setFormInputs({ ...formInputs, [name]: value });
    } else {
      setFormInputs((prev) => {
        const checkBoxItem = prev[name] || [];
        const updatedValue =
          Array.isArray(checkBoxItem) && checkBoxItem.includes(value)
            ? checkBoxItem.filter((item) => item !== value)
            : [...checkBoxItem, value];
        return { ...prev, [name]: updatedValue };
      });
    }
  };

  console.log(JSON.parse(JSON.stringify(formInputs)));

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
        if (
          item.type === "email" ||
          item.type === "text" ||
          item.type === "number"
        ) {
          return (
            <div style={{ marginBlock: "0.5rem" }} key={item.name}>
              <label style={{ display: "block" }} htmlFor={item.name}>
                {item.rules?.required && (
                  <span style={{ color: "red" }}>*</span>
                )}
                {item.label}:
              </label>
              <input
                type={item.type}
                name={item.name}
                value={formInputs[item.name]}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value, item.type)
                }
                required={item.rules?.required ?? true}
                disabled={item.rules?.disabled ?? false}
              />
            </div>
          );
        } else if (item.type === "checkbox") {
          return (
            <div key={item.name}>
              <label>{item.label}:</label>
              {item.options?.map((option) => (
                <div key={option.value}>
                  <input
                    type={item.type}
                    name={item.name}
                    value={option.value}
                    onChange={(e) => {
                      handleInputChange(
                        e.target.name,
                        e.target.value,
                        item.type
                      );
                    }}
                    checked={formInputs[item.name].includes(option?.value)}
                  />
                  {option.label}
                </div>
              ))}
            </div>
          );
        } else if (item.type === "radio") {
          return (
            <div key={item.name}>
              <label>{item.label}:</label>
              {item.options?.map((option) => (
                <div key={option.value}>
                  <input
                    type={item.type}
                    name={item.name}
                    value={option.value}
                    onChange={(e) => {
                      handleInputChange(
                        e.target.name,
                        e.target.value,
                        item.type
                      );
                    }}
                    checked={formInputs[item.name] === option?.value}
                  />
                  {option.label}
                </div>
              ))}
            </div>
          );
        } else if (item.type === "select") {
          return (
            <div key={item.name}>
              <label>{item.label}:</label>
              <select
                name={item.name}
                value={formInputs[item.name] || ""}
                onChange={(e) =>
                  handleInputChange(item.name, e.target.value, item.type)
                }
              >
                {item.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }
      })}
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewInputRenderer;
