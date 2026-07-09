'use client';

import { ChangeEvent } from 'react';
import { formStyles } from '../../styles';
import { regions } from '@/data/regions';
import Image from 'next/image';

interface SelectRegionProps {
  id: string;
  label: string;
  value: string;
  onChangeAction: (e: ChangeEvent<HTMLSelectElement>) => void;
  region?: Array<{ value: string; label: string }>;
  className?: string;
  disabled?: boolean;
}
const SelectRegion = ({
  id,
  label,
  value,
  onChangeAction,
  className,
  disabled,
}: SelectRegionProps) => {
  return (
    <div>
      <label htmlFor={id} className={formStyles.label}>
        {label}
      </label>
      <div className="relative flex w-full items-center">
        <select
          id={id}
          name="region"
          value={value}
          disabled={disabled}
          onChange={onChangeAction}
          className={`${formStyles.input} ${className} cursor-pointer appearance-none pr-8 disabled:cursor-not-allowed disabled:bg-[#f3f2f1]`}
        >
          {regions.map((region) => (
            <option key={region.value} value={region.label}>
              {region.label}
            </option>
          ))}
        </select>

        {!disabled && (
          <div className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2">
            <Image
              src="/icons-products/icon-arrow-right.svg"
              alt="Выберите населенный пункт"
              width={24}
              height={24}
              className="rotate-90"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectRegion;
