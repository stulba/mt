import React from 'react';
import './Button.css';

export const TYPES = {
  PRIMARY: 'btn--primary',
  WARNING: 'btn--warning'
};

export const SIZES = {
  SMALL: 'btn--small',
  LARGE: 'btn--large'
};

const Button = ({ disabled, text = '', size = '', type, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn ${type} ${size}`}
    >
      {text}
    </button>
  );
};

export const Primary = props => <Button {...props} type={TYPES.PRIMARY} />;

export const Warning = props => <Button {...props} type={TYPES.WARNING} />;
