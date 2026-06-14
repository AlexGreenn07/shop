'use client';

import { ChangeEvent } from 'react';
import { formStyles } from '../../styles';
import { InputMask } from '@react-input/mask';

interface CardInputProps {
  id: string;
  label: string;
  value?: string;
  onChangeAction: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}
function CardInput({
  id,
  label,
  value,
  onChangeAction,
  disabled,
}: CardInputProps) {
  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor={id} className={formStyles.label}>
        {label}
      </label>
      <InputMask
        mask="____ ____ ____ ____"
        replacement={{ _: /\d/ }}
        id={id}
        type="text"
        value={value}
        placeholder={disabled ? '' : '0000 0000 0000 0000'}
        onChange={onChangeAction}
        disabled={disabled}
        className={`${formStyles.input} ${disabled ? 'cursor-not-allowed bg-[#f3f2f1]' : ''}`}
      />
    </div>
  );
}

export default CardInput;
