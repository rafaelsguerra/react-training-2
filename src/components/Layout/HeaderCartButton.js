import { useContext, useEffect, useState } from 'react';

import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [buttonIsHiglighted, setButtonIsHighligted] = useState(false);
  const ctx = useContext(CartContext);
  
  const { items } = ctx;
  
  const numberOfItems = items.reduce((currentNumber, item) => { return currentNumber + item.amount }, 0);

  const btnClasses = `${classes.button} ${buttonIsHiglighted ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setButtonIsHighligted(true);

    const timer = setTimeout(() => {
      setButtonIsHighligted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick} >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;