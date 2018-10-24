import React from 'react';
import './Input.css';

function Textarea({ className, name, placeholder, label, required }) {
  return (
    <>
      {label && (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        className={className ? `form__input ${className}` : 'form__input'}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </>
  );
}

export default Textarea;
