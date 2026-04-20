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
  let items;

  try {
    items = await props.fetchData();
  } catch {
    return <div className="text-red-500">{props.errorMessage}</div>;
  }
  const paginatedItems = items.slice(startIdx, startIdx + perPage);
  return (
    <>
      {!props.contentType ? (
        <ProductsSection
          title={props.pageTitle}
          // viewAllButton={{ text: 'На главную', href: '/' }}
          products={paginatedItems as ProductCardProps[]}
        />
      ) : (
        <ArticlesSection
          title={props.pageTitle}
          // viewAllButton={{ text: 'На главную', href: '/' }}
          articles={paginatedItems as ArticleCardProps[]}
        />
      )}

      {items.length > perPage && (
        <PaginationWrapper
          totalItems={items.length}
          currentPage={currentPage}
          basePath={props.basePath}
          contentType={props.contentType}
        />
      )}
    </>
  );
};

export default GenericListPage;
