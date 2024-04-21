import React, { useState } from "react";
import "./App.css";
import { schema } from "./constants/schema";
import InputRenderer from "./components/InputRenderer";
import { inputData } from "./constants/checkboxRadioSchema";
import CheckBox from "./components/CheckBox";
import RadioButton from "./components/RadioButton";
import Select from "./components/Select";

type selectedValuesType = {
  [key: string]: string;
};
type CheckboxSelectedValuesType = {
  [key: string]: string[];
};

function App() {
  const initialState = () => {
    if (schema) {
      return schema.fields.reduce(
        (obj, field) => ({ ...obj, [field.name]: "" }),
        {}
      );
    } else return {};
  };

  const initialRadioAndSelectState = () => {
    if (inputData) {
      return inputData
        .filter((data) => data.multipleSelection.status === false)
        .reduce(
          (acc, curr) => ({ ...acc, [curr.id]: curr.options[0].name }),
          {}
        );
    } else return {};
  };

  const intialCheckboxState = () => {
    if (inputData) {
      return inputData
        .filter((data) => data.multipleSelection.status === true)
        .reduce(
          (acc, curr) => ({ ...acc, [curr.id]: [curr.options[0].name] }),
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
    setRadioAndSelectValues(initialRadioAndSelectState());
    setCheckboxValues(intialCheckboxState());
  };

  const [radioAndSelectValues, setRadioAndSelectValues] =
    useState<selectedValuesType>(initialRadioAndSelectState());
  const handleChangeRadio = (value: string, mainId: string) => {
    setRadioAndSelectValues((prevValues) => ({
      ...prevValues,
      [mainId]: value,
    }));
  };

  const [checkboxValues, setCheckboxValues] =
    useState<CheckboxSelectedValuesType>(intialCheckboxState());

  const handleChangeCheckbox = (valueSent: string, mainId: string) => {

    const reqIndex = checkboxValues[mainId].findIndex(
      (item) => item === valueSent
    );
    const updatedData = { ...checkboxValues };

    if (reqIndex === -1) {
      updatedData[mainId].push(valueSent);
    } else {
      updatedData[mainId] = updatedData[mainId].filter(
        (item) => item !== valueSent
      );
    }
    setCheckboxValues(updatedData);
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
                mainId={item.id}
                selectedValues={checkboxValues[item.id]}
                title={item.title}
                options={item.options}
                disabled={item.disabled}
                required={item.required}
                onChange={handleChangeCheckbox}
              />
            );
          } else {
            if (item.multipleSelection.elementToUse === "RadioButton") {
              return (
                <RadioButton
                  key={item.id}
                  mainId={item.id}
                  selectedValue={radioAndSelectValues[item.id]}
                  title={item.title}
                  options={item.options}
                  disabled={item.disabled}
                  required={item.required}
                  onChange={(value) => handleChangeRadio(value, item.id)}
                />
              );
            }
            if (item.multipleSelection.elementToUse === "Select") {
              return (
                <Select
                  key={item.id}
                  mainId={item.id}
                  selectedValue={radioAndSelectValues[item.id]}
                  title={item.title}
                  options={item.options}
                  disabled={item.disabled}
                  required={item.required}
                  onChange={(value) => handleChangeRadio(value, item.id)}
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
