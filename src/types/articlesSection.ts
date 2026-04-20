import { ArticleCardProps } from './articles';

export interface articlesSectionProps {
  title: string;
  viewAllButton: {
    text: string;
    href: string;
  };
  articles: ArticleCardProps[];
  compact?: boolean;
}
