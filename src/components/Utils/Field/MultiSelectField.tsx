import React from 'react';

interface FieldProps {
  value: string;
  id: string;
  labelName: string;
  onChange: (value: string[]) => void;
  required?: boolean;
  options: { id: string; name: string }[];
}

const MultiSelectField = ({
  labelName,
  id,
  value,
  onChange,
  options,
}: FieldProps) => {
  return (
    <div className="item-container">
      <label className="label-item" htmlFor={id}>
        {labelName}
        <span className="asterisk">*</span>:
      </label>
      <select
        className="input-item"
        multiple
        id={id}
        value={value}
        onChange={(e) =>
          onChange(
            Array.from(e.target.selectedOptions, (option) => option.value)
          )
        }
        required
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultiSelectField;
