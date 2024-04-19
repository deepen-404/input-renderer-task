import React, { useState } from "react";
import RadioButton from "./RadioButton";
import { inputData, option } from "../constants/checkboxRadioSchema";
import Select from "./Select";
import CheckBox from "./CheckBox";

type InputRendererTwoPropsT = {
  elementToUse: "Checkbox" | "Select" | "RadioButton";
  multiSelection: boolean;
  required: boolean;
  disabled: boolean;
  mainId: string;
  title: string;
  options: option[];
};

const InputRendererTwo: React.FC<InputRendererTwoPropsT> = ({
  disabled,
  required,
  title,
  multiSelection,
  options,
  elementToUse,
  mainId,
}) => {
  type selectedValuesType = {
    [key: string]: string;
  };
  type CheckboxSelectedValuesType = {
    [key: string]: string[];
  };

  const [radioAndSelectValues, setRadioAndSelectValues] =
    useState<selectedValuesType>(
      inputData
        .filter((data) => data.multipleSelection.status === false)
        .reduce(
          (acc, curr) => ({ ...acc, [curr.id]: curr.options[0].name }),
          {}
        )
    );
  const handleChange = (value: string, mainId: string) => {
    if (mainId === "") {
      return;
    }
    setRadioAndSelectValues((prevValues) => ({
      ...prevValues,
      [mainId]: value,
    }));
  };

  const [checkboxValues, setCheckboxValues] =
    useState<CheckboxSelectedValuesType>(
      inputData
        .filter((data) => data.multipleSelection.status === true)
        .reduce(
          (acc, curr) => ({ ...acc, [curr.id]: [curr.options[0].name] }),
          {}
        )
    );

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
    <div>
      {!multiSelection && elementToUse === "RadioButton" && (
        <RadioButton
          selectedValue={radioAndSelectValues[mainId]}
          title={title}
          options={options}
          disabled={disabled}
          required={required}
          onChange={(value) => handleChange(value, mainId)}
        />
      )}
      {!multiSelection && elementToUse === "Select" && (
        <Select
          selectedValue={radioAndSelectValues[mainId]}
          title={title}
          options={options}
          disabled={disabled}
          required={required}
          onChange={(value) => handleChange(value, mainId)}
        />
      )}
      {multiSelection && elementToUse === "Checkbox" && (
        <CheckBox
          selectedValues={checkboxValues[mainId]}
          title={title}
          options={options}
          disabled={disabled}
          required={required}
          onChange={(evt) => handleChangeCheckbox(evt, mainId)}
        />
      )}
    </div>
  );
};

export default InputRendererTwo;
