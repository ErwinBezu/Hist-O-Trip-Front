import React, { ChangeEvent, useId } from 'react';
import './Field.scss';

interface FieldProps {
  value: string;
  type?: string;
  placeholder: string;
  onChange: (value: string) => void;
}
// == Composant
function Field({ value, type, placeholder, onChange }: FieldProps) {
  const inputId = useId();

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.value);
  }

  return (
    <div className={value.length > 0 ? 'field field--has-content' : 'field'}>
      <label htmlFor={inputId} className="field-label">
        {placeholder}
      </label>
      <input
        // React - state
        value={value}
        onChange={handleChange}
        // infos de base
        id={inputId}
        type={type}
        className="field-input"
        placeholder={placeholder}
      />
    </div>
  );
}

// Valeurs par défaut pour les props
Field.defaultProps = {
  type: 'text',
};

// == Export
export default Field;
