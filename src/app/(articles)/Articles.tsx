import fetchArticles from './fetchArticles';
import ArticlesSection from './ArticlesSection';

export default async function Articles() {
  const articles = await fetchArticles();

  if (!articles || articles.length === 0) {
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
      articles={articles}
      compact
    />
  );
}
