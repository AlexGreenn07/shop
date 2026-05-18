import { GenericListPageProps } from '@/types/genericListPageProps';
import ProductsSection from '../../components/ProductsSection';
import { CONFIG } from '../../../config/config';
import PaginationWrapper from '@/components/PaginationWrapper';
import ArticlesSection from '../(articles)/ArticlesSection';
import { ProductCardProps } from '@/types/product';
import { ArticleCardProps } from '@/types/articles';
import ErrorComponent from '@/components/ErrorComponent';

const GenericListPage = async ({
  searchParams,
  props,
}: {
  searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
  props: GenericListPageProps;
}) => {
  const params = await searchParams;
  const page = params?.page;
  const defaultItemPerPage =
    props.contentType === 'category'
      ? CONFIG.ITEMS_PER_PAGE_CATEGORY
      : CONFIG.ITEMS_PER_PAGE;
  const itemsPerPage = params?.itemsPerPage || defaultItemPerPage;
  const currentPage = Number(page) || 1;
  const perPage = Number(itemsPerPage);
  const startIdx = (currentPage - 1) * perPage;
  let data;
  let fetchError;

  try {
    data = await props.fetchData({
      pagination: { startIdx, perPage },
    });
  } catch (error) {
    return (
      <ErrorComponent
        error={
          error instanceof Error ? error : new Error(String(error))
        }
        userMessage="Не удалось загрузить акции"
      />
    );
  }

  if (!data) throw new Error(`Ошибка ответа сервера: ${fetchError}`);

  const { items, totalCount } = data;
  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <>
      {!props.contentType || props.contentType === 'category' ? (
        <ProductsSection
          title={props.pageTitle}
          products={items as ProductCardProps[]}
          applyIndexStyles={
            props.contentType === 'category' ? false : true
          }
          contentType={props.contentType}
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
