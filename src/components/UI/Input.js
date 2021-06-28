import { forwardRef } from "react";

import classes from "./Input.module.css";

/**
 * 
 * @param {{label: string, input: {id: string, type: string, min: string, max: string, step: string, defaultValue: string}}} props the props
 * @returns Custom component for input
 */
const Input = forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id} className>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  ) 
});

export default Input;