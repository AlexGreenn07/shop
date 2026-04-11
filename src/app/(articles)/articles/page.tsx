import fetchArticles from '../fetchArticles';
import ArticlesSection from '../ArticlesSection';

export const metadata = {
  title: 'Статьи на сайте магазина "Северяночка"',
  description: 'Читайте статьи на сайте магазина "Северяночка"',
};

const AllArticles = async () => {
  const articles = await fetchArticles().catch(() => null);
  if (!articles || articles.length === 0) {
    return (
      <div className="text-red-500">
        Ошибка: не удалось загрузить статьи
      </div>
    );
  }

  return (
    <ArticlesSection
      title="Все статьи"
      viewAllButton={{ text: 'На главную', href: '/' }}
      articles={articles}
    />
  );
};

export default AllArticles;
