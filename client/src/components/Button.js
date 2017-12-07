import React from 'react';
import classnames from 'classnames';
import './Button.css';

export const Button = ({sm, lg, dark, light, danger, children, ...rest}) => {
  const size = sm ? 'sm' : lg ? 'lg' : 'sm';
  const style = dark ? 'dark' : light ? 'light' : danger ? 'danger' : 'light';
  return (
    <button className={classnames('Button', `Button_${size}`, `Button_${style}`)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
