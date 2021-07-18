import useInput from "../hooks/use-input";

const validateEmail = (value) => {
  const re = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
  return re.test(value);
}

const SimpleInput = (props) => {
  
  const { 
    value: enteredName, 
    isValid: enteredNameIsValid,
    hasError: nameInputHasError, 
    handleValueChange: handleNameChange, 
    handleInputBlur: handleNameBlur ,
    reset: resetNameInput
  } = useInput(value => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailisValid,
    hasError: emailInputHasError,
    handleValueChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    reset: resetEmailInput
  } = useInput(value => validateEmail(value))
  
  let formIsValid;
  if (enteredNameIsValid && enteredEmailisValid) {
    formIsValid = true;
  }

  /**
   * @param {Event} event 
   */
  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (!enteredNameIsValid || !enteredEmailisValid) {
      return;
    }

    resetNameInput();
    resetEmailInput();
  }

  const nameInputClasses = nameInputHasError ? "form-control invalid" : "form-control";
  const emailInputClasses = emailInputHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={handleSubmit}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' value={enteredName} onChange={handleNameChange} onBlur={handleNameBlur} />
      </div>
      {nameInputHasError && <p className="error-text">Name must not be empty!</p>}
      <div className={emailInputClasses}>
        <label htmlFor='name'>Your Email</label>
        <input type='email' id='name' value={enteredEmail} onChange={handleEmailChange} onBlur={handleEmailBlur} />
      </div>
      {emailInputHasError && <p className="error-text">Email is invalid!</p>}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
