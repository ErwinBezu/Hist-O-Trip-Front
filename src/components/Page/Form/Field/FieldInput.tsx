import React, { ChangeEvent } from 'react';

interface FieldProps {
  value: string;
  id: string;
  placeholder: string;
  type?: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const FieldInput = ({
  value,
  placeholder,
  type,
  id,
  onChange,
  required,
}: FieldProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value);
  };

  return (
    <div className="item-container">
      <label className="label-item" htmlFor={id}>
        {placeholder}
        {required ? <span className="asterisk">*</span> : null}:
      </label>
      <input
        className="input-item"
        placeholder={placeholder}
        type={type}
        aria-label={id}
        id={id}
        value={value}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
};

export default FieldInput;
