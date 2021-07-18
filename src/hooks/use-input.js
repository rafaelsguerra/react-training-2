import { useState } from "react";

/**
 * Hook cotaining input logic
 * @param {function(string) : boolean} validateValue Function that will validate input
 * @returns 
 */
const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue)
  const hasError = !valueIsValid && isTouched;

  /**
   * Set a new value to the input value state
   * @param {Event} event 
   */
  const handleValueChange = (event) => {
    setEnteredValue(event.target.value);
  };

  /**
   * Set touched status to the input touched state
   * @param {Event} event 
   */
  const handleInputBlur = (event) => {
    setIsTouched(true);
  }

  /**
   * Resets the statue values
   */
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  }

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError: hasError,
    handleValueChange,
    handleInputBlur,
    reset
  }

}

export default useInput