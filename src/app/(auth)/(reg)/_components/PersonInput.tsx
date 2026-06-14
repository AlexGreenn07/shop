'use client';

import { ChangeEvent } from 'react';
import { formStyles } from '../../styles';

interface PersonInputProps {
  id: string;
  label: string;
  value: string;
  onChangeAction: (e: ChangeEvent<HTMLInputElement>) => void;
}
function PersonInput({
  id,
  label,
  value,
  onChangeAction,
}: PersonInputProps) {
  return (
    <div>
      <label htmlFor={id} className={formStyles.label}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        placeholder={label}
        onChange={onChangeAction}
        className={formStyles.input}
      />
    </div>
  );
}

export default PersonInput;
