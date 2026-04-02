import articlesDatabase from '@/data/articlesDatabase.json';
import iconRight from '../../public/icons-header/icon-arrow-right.svg';
import Link from 'next/link';
import Image from 'next/image';

export default function Articles() {
  const articles = articlesDatabase;
  return (
    <section>
      <div className="flex flex-col justify-center xl:max-w-302">
        <div className="mb-4 flex flex-row justify-between md:mb-8 xl:mb-10">
          <h2 className="text-left text-2xl font-bold text-[#414141] xl:text-4xl">
            Статьи
          </h2>
          <Link
            href="#"
            className="flex cursor-pointer flex-row items-center gap-x-2"
          >
            <p className="text-center text-base text-[#606060] duration-300 hover:text-[#bfbfbf]">
              Все статьи
            </p>
            <Image
              src={iconRight}
              alt="Все статьи"
              width={24}
              height={24}
              sizes="24px"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group flex h-75 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-(--shadow-card) transition-all hover:shadow-(--shadow-article) md:h-105"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={article.img}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="flex grow flex-col gap-y-2 p-3 leading-normal md:gap-y-2.5 md:p-4">
                <time className="text-[10px] text-[#8f8f8f]">
                  {new Date(article.createdAt).toLocaleDateString(
                    'ru-RU'
                  )}
                </time>
                <h3 className="line-clamp-2 min-h-14 text-base font-bold text-[#414141] xl:text-lg">
                  {article.title}
                </h3>
                <p className="mb-3 line-clamp-3 text-xs text-[#414141] xl:text-base">
                  {article.text}
                </p>
                <Link
                  href={`/articles/${article.id}`}
                  className="mt-auto inline-flex h-10 w-37.5 cursor-pointer items-center justify-center rounded bg-[#E5FFDE] px-6 py-2 text-base text-[#70C05B] transition-colors duration-300 hover:bg-(--color-primary) hover:text-white hover:shadow-(--shadow-button-default) active:shadow-(--shadow-button-active)"
                >
                  Подробнее
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
