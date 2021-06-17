import { useState } from 'react';
import Card from '../UI/Card';
import ExpenseFilter from './ExpenseFilter'
import './Expenses.css';
import ExpensesList from './ExpensesList';
import ExpensesChart from './ExpensesChart';

/**
 *@param {{expenses: {id: string, title: string, amount: string, date: Date}[]}} props the properties
 */
const Expenses = (props) => {
  const [enteredFilterYear, setYear] = useState("2020");

  /**
   * Handler that alters the state
   * @param {string} year 
   */
  const handleFilterChanged = (year) => {
    setYear(year);
  }

  const filteredExpenses = props.expenses.filter(expense => {
    return expense.date.getFullYear().toString() === enteredFilterYear;
  });

  return (
    <div>
      <Card className='expenses'>
        <ExpenseFilter selected={enteredFilterYear} onChangeFilter={handleFilterChanged} />
        <ExpensesChart expenses={filteredExpenses} />
        <ExpensesList expenses={filteredExpenses} />
      </Card>
    </div>
  );
}

export default Expenses;