import { Article } from './articles';

export interface articlesSectionProps {
  title: string;
  viewAllButton: {
    text: string;
    href: string;
  };
  articles: Article[];
  compact?: boolean;
}
