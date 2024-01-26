import { useState } from "react";

export const useInput = <T>(defaultValue: T, validationFn: (value: T) => boolean = () => true) => {
  const [enteredValue, setEnteredValue] = useState<T>(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  const handleInputChange = (event: any) => {
    setEnteredValue(event.target.value as unknown as T);
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