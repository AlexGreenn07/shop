import { ProductCardProps } from './product';
import { ArticleCardProps } from './articles';

type ContentItem = ProductCardProps | ArticleCardProps;

interface PaginatedResponse {
  items: ContentItem[];
  totalCount: number;
}

export interface GenericListPageProps {
  fetchData: (options: {
    pagination: { startIdx: number; perPage: number };
  }) => Promise<PaginatedResponse>;
  pageTitle: string;
  basePath: string;
  errorMessage: string;
  contentType?: 'articles';
}
