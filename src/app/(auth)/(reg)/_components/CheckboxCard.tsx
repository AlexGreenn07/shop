'use client';

import { ChangeEvent } from 'react';
import Image from 'next/image';

interface CheckboxCardProps {
  id: string;
  checked: boolean | undefined;
  onChangeAction: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxCard = ({
  checked,
  id,
  onChangeAction,
}: CheckboxCardProps) => {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor={id}
        className="inline-flex cursor-pointer items-center"
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChangeAction}
          className="absolute h-0 w-0 opacity-0"
        />
        <span
          className={`relative flex h-5 w-5 items-center justify-center rounded border duration-300 ${checked ? 'border-primary bg-primary' : 'border-[#bfbfbf] bg-white'}`}
        >
          {checked && (
            <Image
              src="/icons-auth/icon-has.svg"
              alt={
                checked
                  ? 'Нет карты лояльности'
                  : 'Есть карта лояльности'
              }
              width={12}
              height={12}
              className="text-white"
            />
          )}
        </span>
        <span className="ml-2 text-[#8f8f8f]">
          {'У меня нет карты лояльности'}
        </span>
      </label>
    </div>
  );
};

export default CheckboxCard;
