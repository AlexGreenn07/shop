import ViewAllButton from '@/components/ViewAllButton';
import { articlesSectionProps } from '@/types/articlesSection';
import ArticleCard from './ArticleCard';

const ArticlesSection = ({
  title,
  viewAllButton,
  articles,
}: articlesSectionProps) => {
  return (
    <section>
      <div
        className={`align-center flex flex-col justify-center px-[max(12px,calc((100%-1208px)/2))]`}
      >
        <div className="mb-4 flex flex-row justify-between md:mb-8 xl:mb-10">
          <h2 className="text-left text-2xl font-bold text-[#414141] xl:text-4xl">
            {title}
          </h2>
          {viewAllButton && (
            <ViewAllButton
              btnText={viewAllButton.text}
              href={viewAllButton.href}
            />
          )}
        </div>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
          {articles.map((article) => (
            <li key={article._id} className={`p-2`}>
              <ArticleCard {...article} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ArticlesSection;
