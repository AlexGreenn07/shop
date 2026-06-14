'use client';

import { ChangeEvent } from 'react';
import { formStyles } from '../../styles';

interface EmailInputProps {
  id: string;
  label: string;
  value?: string;
  onChangeAction: (e: ChangeEvent<HTMLInputElement>) => void;
}
function EmailInput({
  id,
  label,
  value,
  onChangeAction,
}: EmailInputProps) {
  return (
    <div>
      <label htmlFor={id} className={formStyles.label}>
        {label}
      </label>
      <input
        id={id}
        type="email"
        value={value}
        placeholder={label}
        onChange={onChangeAction}
        className={formStyles.input}
      />
    </div>
  );
}

export default EmailInput;
