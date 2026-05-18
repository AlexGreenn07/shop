import GenericListPage from '@/app/(products)/GenericListPage';
import { Loader } from '@/components/Loader';
import { TRANSLATIONS } from '@/utils/translations';
import { Suspense } from 'react';
import fetchProductsByCategory from '../../fetchProductsByCategory';
import ErrorComponent from '@/components/ErrorComponent';

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
  searchParams: Promise<{ page?: string; itemPerPage?: string }>;
}) => {
  let category;
  try {
    category = (await params).category;
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
    <Suspense fallback={<Loader />}>
      <GenericListPage
        searchParams={searchParams}
        props={{
          fetchData: ({ pagination: { startIdx, perPage } }) =>
            fetchProductsByCategory(category, {
              pagination: { startIdx, perPage },
            }),
          pageTitle: TRANSLATIONS[category] || category,
          basePath: `/category/${category}`,
          contentType: 'category',
        }}
      />
    </Suspense>
  );
};

export default CategoryPage;
