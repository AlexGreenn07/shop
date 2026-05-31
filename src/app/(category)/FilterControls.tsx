import Link from 'next/link';
import Image from 'next/image';
import { FilterControlsProps } from '@/types/FilterControlsProps';

function FilterControls({
  activeFilter,
  basePath,
  searchParams = {},
}: FilterControlsProps) {
  function buildClearFiltersLink() {
    const params = new URLSearchParams();

    if (searchParams.page) {
      params.set('page', searchParams.page);
    }
    if (searchParams.itemPerPage) {
      params.set('itemPerPage', searchParams.itemPerPage);
    }
    params.delete('filter');

    return `${basePath}?${params.toString}`;
  }
  const activeFilterCount = activeFilter
    ? Array.isArray(activeFilter)
      ? activeFilter.length
      : 1
    : 0;
  const filterButtonText =
    activeFilterCount === 0
      ? 'Фильтры'
      : activeFilterCount === 1
        ? 'Фильтр 1'
        : `Фильтры ${activeFilterCount}`;

  return (
    <div className="mb-6 flex flex-row gap-x-6">
      <div
        className={`flex h-8 cursor-not-allowed items-center justify-center gap-x-2 rounded p-2 text-xs duration-300 ${
          !activeFilter || activeFilter.length === 0
            ? 'bg-[#f3f2f1] text-[#606060]'
            : 'bg-(--color-primary) text-white'
        }`}
      >
        {filterButtonText}
      </div>
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
          Очистить фильтры{' '}
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
