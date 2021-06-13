import "./ExpenseForm.css"
import { useState } from "react";

/**
 * Component regarding the register form of a new expense.
 * @param {{onSaveExpenseData: (data: {title:string, amount: string, date: Date}) => void, onCancel: () => void}} props 
 */
const ExpenseForm = (props) => {
  // const [enteredTitle, setTitle] = useState("");
  // const [enteredAmount, setAmount] = useState("");
  // const [enteredDate, setDate] = useState("");
  const [userInput, setUserInput] = useState({
    enteredTitle: "",
    enteredAmount: "",
    enteredDate: ""
  });

  const titleChangeHandler = (event) => {
    // setTitle(event.target.value);

    setUserInput((previousState) => {
      return { ...previousState, enteredTitle: event.target.value };
    });
  };

  const amountChangeHandler = (event) => {
    // setAmount(event.target.value);
    setUserInput((previousState) => {
      return { ...previousState, enteredAmount: event.target.value };
    });
  };

  const dateChangeHandler = (event) => {
    // setDate(event.target.value);
    setUserInput((previousState) => {
      return { ...previousState, enteredDate: event.target.value };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: userInput.enteredTitle,
      amount: userInput.enteredAmount,
      date: new Date(userInput.enteredDate)
    };

    props.onSaveExpenseData(expenseData);
    setUserInput({
      enteredTitle: "",
      enteredAmount: "",
      enteredDate: ""
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" value={userInput.enteredTitle} onChange={titleChangeHandler} />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input type="number" min="0.01" step="0.01" value={userInput.enteredAmount} onChange={amountChangeHandler} />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input type="date" min="2019-01-01" max="2022-12-31" value={userInput.enteredDate} onChange={dateChangeHandler} />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button type="submit">Add expense</button>
      </div>
    </form>
  )
};

export default ExpenseForm;