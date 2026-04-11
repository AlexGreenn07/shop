import ViewAllButton from '@/components/ViewAllButton';
import { articlesSectionProps } from '@/types/articlesSection';
import ArticleCard from './ArticleCard';

const ArticlesSection = ({
  title,
  viewAllButton,
  articles,
  compact = false,
}: articlesSectionProps) => {
  return (
    <section>
      <div
        className={`flex w-full flex-col justify-center text-[#414141] ${!compact ? 'mt-20 px-[max(12px,calc((100%-1208px)/2))]' : ''}`}
      >
        <div className="mb-4 flex flex-row justify-between md:mb-8 xl:mb-10">
          <h2 className="text-left text-2xl font-bold text-[#414141] xl:text-4xl">
            {title}
          </h2>
          <ViewAllButton
            btnText={viewAllButton.text}
            href={viewAllButton.href}
          />
        </div>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-3">
          {articles.map((article, index) => (
            <li
              key={article._id}
              className={
                compact
                  ? `p-2 ${index >= 4 ? 'hidden' : ''} ${index >= 3 ? 'md:hidden xl:block' : ''} ${index >= 4 ? 'xl:hidden' : ''}`
                  : 'p-2'
              }
            >
              <ArticleCard {...article} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ArticlesSection;
