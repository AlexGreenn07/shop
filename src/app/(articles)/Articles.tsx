import fetchArticles from './fetchArticles';
import ArticlesSection from './ArticlesSection';
import { CONFIG } from '../../../config/config';

export default async function Articles() {
  const { items } = await fetchArticles({
    articlesLimit: CONFIG.ITEMS_PER_PAGE_MAIN_ARTICLES,
  });

  if (!items || items.length === 0) {
    return (
      <div className="text-red-500">
        Ошибка: не удалось загрузить статьи
      </div>
    );
  }

  return (
    <ArticlesSection
      title="Статьи"
      viewAllButton={{ text: 'Все статьи', href: 'articles' }}
      articles={items}
    />
  );
}
