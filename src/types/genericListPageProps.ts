import { ProductCardProps } from './product';
import { ArticleCardProps } from './articles';

type ContentItem = ProductCardProps | ArticleCardProps;

export interface GenericListPageProps {
  fetchData: () => Promise<ContentItem[]>;
  pageTitle: string;
  basePath: string;
  errorMessage: string;
  contentType?: 'articles';
}
