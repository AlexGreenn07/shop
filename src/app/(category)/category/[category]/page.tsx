import GenericListPage from '@/app/(products)/GenericListPage';
import { Loader } from '@/components/Loader';
import { TRANSLATIONS } from '@/utils/translations';
import { Suspense } from 'react';
import fetchProductsByCategory from '../../fetchProductsByCategory';
import ErrorComponent from '@/components/ErrorComponent';
import FilterButtons from '../../FilterButtons';

import FilterControls from '../../FilterControls';
import PriceFilter from '../../PriceFilter';
import DropFilter from '../../DropFilter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return {
    title: TRANSLATIONS[category] || category,
    description: `Описание категории товаров "${
      TRANSLATIONS[category] || category
    }" магазина "Северяночка"`,
  };
}

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{
    page?: string;
    itemPerPage?: string;
    filter?: string | string[];
    priceFrom?: string;
    priceTo?: string;
    inStock?: string;
  }>;
}) => {
  let category;
  let resolvedSearchParams;
  let activeFilter;
  let priceFrom;
  let priceTo;
  let inStock;
  try {
    category = (await params).category;
    resolvedSearchParams = await searchParams;
    activeFilter = resolvedSearchParams.filter;
    priceFrom = resolvedSearchParams.priceFrom;
    priceTo = resolvedSearchParams.priceTo;
    inStock = resolvedSearchParams.inStock === 'true';
  } catch (error) {
    return (
      <ErrorComponent
        error={
          error instanceof Error ? error : new Error(String(error))
        }
        userMessage="Ошибка получения категории"
      />
    );
  }
  return (
    <div className="mx-auto flex flex-col px-[max(12px,calc((100%-1208px)/2))]">
      <h1 className="text-main-text mb-8 ml-3 max-w-84 text-left text-4xl leading-[150%] font-bold md:mb-10 md:max-w-max md:text-5xl xl:mb-15 xl:ml-0">
        {TRANSLATIONS[category] || category}
      </h1>
      <DropFilter
        basePath={`/category/${category}`}
        category={category}
      />
      <div className="hidden xl:flex">
        <FilterButtons basePath={`/category/${category}`} />
      </div>
      <div className="flex flex-row justify-between gap-x-10">
        <div className="hidden w-68 flex-col gap-y-10 xl:flex">
          <div className="text-main-text flex h-11 items-center rounded bg-[#f3f2f1] p-2.5 text-base font-bold">
            Фильтр
          </div>
          <PriceFilter
            basePath={`/category/${category}`}
            category={category}
          />
        </div>
        <div className="flex flex-col">
          <div className="hidden xl:flex">
            <FilterControls basePath={`/category/${category}`} />
          </div>

          <Suspense fallback={<Loader />}>
            <GenericListPage
              searchParams={Promise.resolve(resolvedSearchParams)}
              props={{
                fetchData: ({ pagination: { startIdx, perPage } }) =>
                  fetchProductsByCategory(category, {
                    pagination: { startIdx, perPage },
                    filter: activeFilter,
                    priceFrom,
                    priceTo,
                    inStock,
                  }),
                basePath: `/category/${category}`,
                contentType: 'category',
              }}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
