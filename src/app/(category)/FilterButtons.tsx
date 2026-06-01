'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const FILTERS = [
  { key: 'our-production', label: 'Товары нашего производства' },
  { key: 'healthy-food', label: 'Полезное питание' },
  { key: 'non-gmo', label: 'Без ГМО' },
];

const FilterButtons = ({ basePath }: { basePath: string }) => {
  const searchParams = useSearchParams();
  const currentFilters = searchParams.getAll('filter');

  const buildFilterLink = (filterKey: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (currentFilters.includes(filterKey)) {
      params.delete('filter');
      currentFilters
        .filter((f) => f !== filterKey)
        .forEach((f) => params.append('filter', f));
    } else {
      params.append('filter', filterKey);
    }

    params.delete('page');

    return `${basePath}?${params.toString()}`;
  };

  const isFilterActive = (filterKey: string) =>
    currentFilters.includes(filterKey);

  return (
    <div className="flex flex-row flex-wrap items-center gap-4">
      {FILTERS.map((filter) => (
        <Link
          key={filter.key}
          href={buildFilterLink(filter.key)}
          className={`flex h-8 cursor-pointer items-center justify-center rounded p-2 text-xs duration-300 ${
            isFilterActive(filter.key)
              ? 'bg-(--color-primary) text-white hover:shadow-(--shadow-button-default) active:shadow-(--shadow-button-active)'
              : 'bg-[#f3f2f1] text-[#606060] hover:shadow-(--shadow-button-secondary) active:shadow-(--shadow-button-active)'
          } `}
        >
          {filter.label}
        </Link>
      ))}
    </div>
  );
};

export default FilterButtons;
