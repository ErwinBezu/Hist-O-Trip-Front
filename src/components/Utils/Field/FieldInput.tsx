import React, { ChangeEvent } from 'react';

interface FieldProps {
  value: string;
  id: string;
  placeholder: string;
  type?: string;
  onChange: (value: string) => void;
  required?: boolean;
  labelName?: string;
  disabled?: boolean;
}

const FieldInput = ({
  value,
  placeholder,
  type,
  id,
  onChange,
  required,
  labelName,
  disabled,
}: FieldProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value);
  };

  return (
    <div className="item-container">
      <label className="label-item" htmlFor={id}>
        {labelName}
        {labelName && !placeholder ? null : placeholder}
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
        disabled={disabled}
      />
    </div>
  );
};

export default FieldInput;
