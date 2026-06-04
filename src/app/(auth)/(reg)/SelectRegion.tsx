'use client';

import { ChangeEvent } from 'react';
import { formStyles } from './styles';
import { regions } from '@/data/regions';
import Image from 'next/image';

interface SelectRegionProps {
  id: string;
  label: string;
  value: string;
  onChangeAction: (e: ChangeEvent<HTMLSelectElement>) => void;
  region?: Array<{ value: string; label: string }>;
}
const SelectRegion = ({
  id,
  label,
  value,
  onChangeAction,
}: SelectRegionProps) => {
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
          {regions.map((region) => (
            <option key={region.value}>{region.label}</option>
          ))}
        </select>

        <div className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2">
          <Image
            src="/icons-products/icon-arrow-right.svg"
            alt="Выберите регион"
            width={24}
            height={24}
            className="rotate-90"
          />
        </div>
      </div>
    </div>
  );
};

export default SelectRegion;
