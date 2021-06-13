import "./NewExpense.css"
import ExpenseForm from "./ExpenseForm";
import { useState } from "react";

const NewExpense = (props) => {
  const [showForm, setShowForm] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString()
    }
    props.onAddExpense(expenseData);
    setShowForm(false);
  };

  const handleShowForm = () => {
    setShowForm(previousState => {
      return !previousState;
    });
  }

  let element = <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onCancel={handleShowForm} />
  if (!showForm) {
    element = <button type="button" onClick={handleShowForm}>Add new expense</button>
  }

  return (
    <div className="new-expense">
      {element}
    </div>
  )
};

export default NewExpense;