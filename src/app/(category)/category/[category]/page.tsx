import GenericListPage from '@/app/(products)/GenericListPage';
import { Loader } from '@/components/Loader';
import { TRANSLATIONS } from '@/utils/translations';
import { Suspense } from 'react';
import fetchProductsByCategory from '../../fetchProductsByCategory';
import ErrorComponent from '@/components/ErrorComponent';
import FilterButtons from '../../FilterButtons';

import FilterControls from '../../FilterControls';

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
  }>;
}) => {
  let category;
  let resolvedSearchParams;
  let activeFilter;
  try {
    category = (await params).category;
    resolvedSearchParams = await searchParams;
    activeFilter = resolvedSearchParams.filter;
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
    <div className="px-[max(12px,calc((100%-1208px)/2))]">
      <h1 className="mb-15 text-left text-2xl font-bold text-[#414141] xl:text-4xl">
        {TRANSLATIONS[category] || category}
      </h1>
      <FilterButtons basePath={`/category/${category}`} />
      <FilterControls
        activeFilter={resolvedSearchParams.filter}
        basePath={`/category/${category}`}
        searchParams={{
          page: resolvedSearchParams.page,
          itemPerPage: resolvedSearchParams.itemPerPage,
        }}
      />
      <Suspense fallback={<Loader />}>
        <GenericListPage
          searchParams={Promise.resolve(resolvedSearchParams)}
          props={{
            fetchData: ({ pagination: { startIdx, perPage } }) =>
              fetchProductsByCategory(category, {
                pagination: { startIdx, perPage },
                filter: activeFilter,
              }),
            basePath: `/category/${category}`,
            contentType: 'category',
          }}
        />
      </Suspense>
    </div>
  );
};

export default CategoryPage;
