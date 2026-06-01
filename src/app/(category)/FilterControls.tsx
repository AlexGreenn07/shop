'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FilterControlsProps } from '@/types/FilterControlsProps';
import { useSearchParams } from 'next/navigation';

function FilterControls({ basePath }: FilterControlsProps) {
  const searchParams = useSearchParams();
  const minPrice = searchParams.get('priceFrom');
  const maxPrice = searchParams.get('priceTo');
  const activeFilter = searchParams.getAll('filter');

  function buildClearFiltersLink() {
    const params = new URLSearchParams();

    if (searchParams.get('page')) {
      params.set('page', searchParams.get('page') || '');
    }
    if (searchParams.get('itemPerPage')) {
      params.set(
        'itemPerPage',
        searchParams.get('itemPerPage') || ''
      );
    }
    params.delete('filter');
    params.delete('priceFrom');
    params.delete('priceTo');

    return `${basePath}?${params.toString()}`;
  }

  const hasPriceFilter = minPrice || maxPrice;

  const buildClearPriceFilterLink = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('priceFrom');
    params.delete('priceTo');

    return `${basePath}?${params.toString()}`;
  };

  const activeFilterCount =
    (activeFilter
      ? Array.isArray(activeFilter)
        ? activeFilter.length
        : 1
      : 0) + (hasPriceFilter ? 1 : 0);
  const filterButtonText =
    activeFilterCount === 0
      ? 'Фильтры'
      : activeFilterCount === 1
        ? 'Фильтр 1'
        : `Фильтры ${activeFilterCount}`;

  return (
    <div className="flex flex-row flex-wrap items-center gap-4">
      <div
        className={`flex h-8 cursor-not-allowed items-center justify-center gap-x-2 rounded p-2 text-xs duration-300 ${
          (activeFilter && activeFilter.length > 0) || hasPriceFilter
            ? 'bg-(--color-primary) text-white'
            : 'bg-[#f3f2f1] text-[#606060]'
        }`}
      >
        {filterButtonText}
      </div>
      {hasPriceFilter && (
        <div className="flex h-8 items-center justify-center gap-x-2 rounded bg-(--color-primary) p-2 text-xs text-white duration-300">
          <Link
            href={buildClearPriceFilterLink()}
            className="flex items-center gap-x-2"
          >
            Цена {minPrice !== undefined ? `от ${minPrice}` : ''}{' '}
            {maxPrice !== undefined ? `до ${maxPrice}` : ''}
            <Image
              src="/icons-products/icon-closer.svg"
              alt="Очистить фильтр по цене"
              width={24}
              height={24}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </Link>
        </div>
      )}
      <div
        className={`flex h-8 cursor-pointer items-center justify-center gap-x-2 rounded p-2 text-xs duration-300 ${
          !activeFilter || activeFilter.length === 0
            ? 'bg-[#f3f2f1] text-[#606060]'
            : 'bg-(--color-primary) text-white'
        }`}
      >
        <Link
          className="flex items-center gap-x-2"
          href={buildClearFiltersLink()}
        >
          Очистить фильтры
          <Image
            src="/icons-products/icon-closer.svg"
            alt="Очистить фильтры"
            width={24}
            height={24}
            style={
              !activeFilter || activeFilter.length === 0
                ? {}
                : { filter: 'brightness(0) invert(1)' }
            }
          />
        </Link>
      </div>
    </div>
  );
}

export default FilterControls;
