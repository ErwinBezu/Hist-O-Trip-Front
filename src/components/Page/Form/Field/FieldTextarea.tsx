import React, { ChangeEvent } from 'react';

interface FieldProps {
  value: string;
  id: string;
  placeholder: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const FieldTextarea = ({
  value,
  placeholder,
  id,
  onChange,
  required,
}: FieldProps) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    onChange(event.target.value);
  };

  return (
    <div className="item-container">
      <label className="label-item" htmlFor={id}>
        {placeholder}
        {required ? <span className="asterisk">*</span> : null}:
      </label>
      <textarea
        className="input-item input-textarea"
        aria-label={id}
        id={id}
        value={value}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
};

export default FieldTextarea;
