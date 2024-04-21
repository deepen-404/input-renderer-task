import React, { useState } from "react";
import RadioButton from "./RadioButton";
import { inputData, option } from "../constants/checkboxRadioSchema";

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

  const [radioAndSelectValues, setRadioAndSelectValues] =
    useState<selectedValuesType>(() =>
      inputData
        .filter((data) => data.multipleSelection.status === false)
        .reduce(
          (acc, curr) => ({ ...acc, [curr.id]: curr.options[0].name }),
          {}
        )
    );
  const handleChange = (value: string, mainId: string) => {
    console.log(`value: ${value}, id: ${mainId}`);
    console.log("previous data: ", radioAndSelectValues);
    const updatedData = { ...radioAndSelectValues, [mainId]: value };
    console.log("updated data: ", updatedData);
    setRadioAndSelectValues(updatedData);
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
    </div>
  );
};

export default InputRendererTwo;
