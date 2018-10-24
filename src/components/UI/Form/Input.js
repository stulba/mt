import React from 'react';
import './Input.css';

export const Input = ({
  type,
  onChange,
  id,
  className,
  name,
  placeholder,
  hidden,
  disabled,
  label,
  value,
  checked,
  required
}) => {
  return (
    <>
      {label && (
        <label className="label" htmlFor={id || name}>
          {label}
        </label>
      )}
      <input
        id={id || name}
        onChange={onChange}
        className={className ? `form__input ${className}` : 'form__input'}
        type={type}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        hidden={hidden}
        value={value}
        checked={checked}
        required={required}
      />
    </>
  );
};

export default Input;
