import { useRef, useState } from "react";

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

/**
 * 
 * @param {{id:string}} props The item ID
 * @returns 
 */
const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submit = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmount > 5 ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submit}>
     <Input ref={amountInputRef} label="Amount" input={{ //Input is a custom component, so Refs must be used to have access to its values.
       id: "amount_" + props.id,
       type: "number",
       min: "1",
       max: "5",
       step: "1",
       defaultValue: "1"
     }} />
      <button>Add</button>
      {!amountIsValid && <p>Please, enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;