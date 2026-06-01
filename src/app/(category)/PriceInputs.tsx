import { PriceInputProps } from '@/types/priceInputsProps';
import Image from 'next/image';

const PriceInputs = ({
  from,
  to,
  handleInputChange,
  min,
  max,
}: PriceInputProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-2">
      <input
        type="number"
        name="from"
        value={from}
        onChange={handleInputChange}
        placeholder={String(min)}
        min={min}
        max={max}
        className="h-10 w-31 rounded border border-[#bfbfbf] bg-white px-4 py-2"
      />
      <Image
        src="/icons-products/icon-line.svg"
        alt="до"
        width={24}
        height={24}
      />
      <input
        type="number"
        name="to"
        value={to}
        onChange={handleInputChange}
        placeholder={String(max)}
        min={min}
        max={max}
        className="h-10 w-31 rounded border border-[#bfbfbf] bg-white px-4 py-2"
      />
    </div>
  );
};

export default PriceInputs;
