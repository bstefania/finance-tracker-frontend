import { useState } from "react";

export const useInput = (defaultValue: any, validationFn: (value: any) => boolean = () => true) => {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  const handleInputChange = (event: any) => {
    setEnteredValue(event.target.value);
    setDidEdit(true);
  }

  const handleInputBlur = () => {
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid
  }
}