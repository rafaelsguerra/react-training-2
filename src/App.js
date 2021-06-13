import { useState } from 'react';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/New Expense/NewExpense';

const INITIAL_EXPENSES = [
  { id: Math.random().toString(), title: 'Car insurance', amount: '500.75', date: new Date(2021, 2, 28)},
  { id: Math.random().toString(), title: 'Toilet paper', amount: '94.75', date: new Date(2021, 7, 14)},
  { id: Math.random().toString(), title: 'New desk', amount: '200.75', date: new Date(2021, 5, 12)},
  { id: Math.random().toString(), title: 'TV', amount: '800.75', date: new Date(2021, 2, 28)},
]

function App() {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);

  const addExpenseHandler = (expense) => {
    setExpenses(previousState => {
      return [expense, ...previousState];
    });
  };

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses expenses={expenses}></Expenses>
    </div>
  );
}

export default App;
