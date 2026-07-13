'use client';

import { useId } from 'react';
import { formStyles } from '../../styles';

interface GenderSelectProps {
  label: string;
  value: string;
  onChangeAction: (gender: string) => void;
}
const GenderSelect = ({
  label,
  value,
  onChangeAction,
}: GenderSelectProps) => {
  const labelId = useId();
  const genders = [
    { id: 'male', label: 'Мужской' },
    { id: 'female', label: 'Женский' },
  ];

  return (
    <div
      className="w-full text-xs"
      role="radiogroup"
      aria-labelledby={labelId}
    >
      <span id={labelId} className={formStyles.label}>
        {label}
      </span>
      <div className="flex h-10 gap-1 rounded bg-[#f3f2f1] p-1">
        {genders.map((gender) => {
          const inputId = `${labelId}-${gender.id}`;
          const isChecked = value === gender.id;
          return (
            <label
              key={gender.id}
              htmlFor={inputId}
              className={`flex flex-1 cursor-pointer items-center justify-center rounded duration-300 ${isChecked ? 'bg-primary text-white' : ''}`}
            >
              <input
                id={inputId}
                type="radio"
                name={labelId}
                value={gender.id}
                checked={isChecked}
                onChange={() => onChangeAction(gender.id)}
                className="sr-only"
              />
              {gender.label}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default GenderSelect;
