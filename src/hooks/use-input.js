import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false
}

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }
  return inputStateReducer;
}

/**
 * Hook cotaining input logic
 * @param {function(string) : boolean} validateValue Function that will validate input
 * @returns 
 */
const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState)

  const valueIsValid = validateValue(inputState.value)
  const hasError = !valueIsValid && inputState.isTouched;

  /**
   * Set a new value to the input value state
   * @param {Event} event 
   */
  const handleValueChange = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  /**
   * Set touched status to the input touched state
   * @param {Event} event 
   */
  const handleInputBlur = (event) => {
    dispatch({ type: "BLUR" });
  }

  /**
   * Resets the statue values
   */
  const reset = () => {
    dispatch({ type: "RESET" });
  }

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError: hasError,
    handleValueChange,
    handleInputBlur,
    reset
  }

}

export default useInput