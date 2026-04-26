import { GenericListPageProps } from '@/types/genericListPageProps';
import ProductsSection from './ProductsSection';
import { CONFIG } from '../../../config/config';
import PaginationWrapper from '@/components/PaginationWrapper';
import ArticlesSection from '../(articles)/ArticlesSection';
import { ProductCardProps } from '@/types/product';
import { ArticleCardProps } from '@/types/articles';

const GenericListPage = async ({
  searchParams,
  props,
}: {
  searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
  props: GenericListPageProps;
}) => {
  const params = await searchParams;
  const page = params?.page;
  const itemsPerPage = params?.itemsPerPage || CONFIG.ITEMS_PER_PAGE;
  const currentPage = Number(page) || 1;
  const perPage = Number(itemsPerPage);
  const startIdx = (currentPage - 1) * perPage;
  let data;
  let fetchError;

  try {
    data = await props.fetchData({
      pagination: { startIdx, perPage },
    });
  } catch {
    fetchError = props.errorMessage;
  }

  if (!data) throw new Error(`Ошибка ответа сервера: ${fetchError}`);

  const { items, totalCount } = data;
  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <>
      {!props.contentType ? (
        <ProductsSection
          title={props.pageTitle}
          products={items as ProductCardProps[]}
        />
      ) : (
        <ArticlesSection
          title={props.pageTitle}
          articles={items as ArticleCardProps[]}
        />
      )}

      {totalPages > 1 && (
        <PaginationWrapper
          totalItems={totalCount}
          currentPage={currentPage}
          basePath={props.basePath}
          contentType={props.contentType}
        />
      )}
    </>
  );
};

export default GenericListPage;
