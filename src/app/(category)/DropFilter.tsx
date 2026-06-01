'use client';
import Image from 'next/image';
import { useState } from 'react';
import FilterButtons from './FilterButtons';
import PriceFilter from './PriceFilter';
import FilterControls from './FilterControls';

function DropFilter({
  basePath,
  category,
}: {
  basePath: string;
  category: string;
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <>
      <button
        className="ml-3 flex h-8 w-32 cursor-pointer items-center justify-center gap-x-2 rounded bg-(--color-primary) p-2 text-xs text-white duration-300 hover:shadow-(--shadow-button-default) active:shadow-(--shadow-button-active) xl:hidden"
        onClick={() => setIsFilterOpen(true)}
      >
        Фильтр
      </button>
      <div
        className={`fixed top-0 left-0 z-50 flex h-screen w-full max-w-90 origin-left transform flex-col gap-y-10 overflow-y-auto bg-white p-4 text-[#414141] shadow-(--shadow-article) transition-all duration-300 ease-in-out xl:hidden ${isFilterOpen ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}
      >
        <div className="mb-4 flex h-11 items-center justify-between rounded bg-[#f3f2f1] p-2.5 text-base font-bold">
          <h3 className="flex items-center justify-start">Фильтр</h3>
          <button
            className="cursor-pointer text-2xl"
            onClick={() => setIsFilterOpen(false)}
          >
            <Image
              src="/icons-products/icon-closer.svg"
              alt="Закрыть фильтр"
              width={24}
              height={24}
            />
          </button>
        </div>
        <FilterButtons basePath={basePath} />
        <FilterControls basePath={basePath} />
        <PriceFilter
          basePath={basePath}
          category={category}
          setIsFilterOpenAction={setIsFilterOpen}
        />
      </div>
    </>
  );
}

export default DropFilter;
