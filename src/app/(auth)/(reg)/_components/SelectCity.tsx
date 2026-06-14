'use client';

import { ChangeEvent } from 'react';
import { formStyles } from '../../styles';
import { cities } from '@/data/cities';
import Image from 'next/image';

interface SelectCityProps {
  id: string;
  label: string;
  value: string;
  onChangeAction: (e: ChangeEvent<HTMLSelectElement>) => void;
  cities?: Array<{ value: string; label: string }>;
}
const SelectCity = ({
  id,
  label,
  value,
  onChangeAction,
}: SelectCityProps) => {
  return (
    <div>
      <label htmlFor={id} className={formStyles.label}>
        {label}
      </label>
      <div className="relative flex w-full items-center">
        <select
          id={id}
          value={value}
          onChange={onChangeAction}
          className={`${formStyles.input} cursor-pointer appearance-none pr-8`}
        >
          {cities.map((city) => (
            <option key={city.value}>{city.label}</option>
          ))}
        </select>

        <div className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2">
          <Image
            src="/icons-products/icon-arrow-right.svg"
            alt="Выберите населенный пункт"
            width={24}
            height={24}
            className="rotate-90"
          />
        </div>
      </div>
    </div>
  );
};

export default SelectCity;
