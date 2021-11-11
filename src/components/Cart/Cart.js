import { Fragment, useContext, useState } from "react";

import axios from "axios";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css"
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const ctx = useContext(CartContext);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const handleCartItemRemove = (id) => {
    ctx.removeItem(id);
  };

  const hanldeCartItemAdd = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const handleOrder = (event) => {
    setIsCheckout(true);
  };

  const handleSubmitOrder = async (userData) => {
    setIsLoading(true)
    try {
      await axios.post(
        "https://react-http-2601b-default-rtdb.firebaseio.com/orders.json",
        { user: userData, items: ctx.items }
      );
      setIsLoading(false);
      setDidSubmit(true);
      ctx.clearCart();
    } catch (error) {
      window.alert("Error when sending data:", error.message)
      setIsLoading(false);
      setDidSubmit(true);
    }
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={handleCartItemRemove.bind(null, item.id)}
          onAdd={hanldeCartItemAdd.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button-alt"]} onClick={props.onClose}>Close</button>
      {hasItems && <button onClick={handleOrder} className={classes.button}>Order</button>}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      < div className={classes.total} >
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div >
      {isCheckout && <Checkout onConfirm={handleSubmitOrder} onCancel={props.onClose} />}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order...</p>;

  const didSubmitModalContent =
    <Fragment>
      <p>Order sent successfully.</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>Close</button>
      </div>
    </Fragment>

  return (
    <Modal onClose={props.onClose}>
      {!isLoading && !didSubmit && cartModalContent}
      {isLoading && isSubmittingModalContent}
      {!isLoading && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;