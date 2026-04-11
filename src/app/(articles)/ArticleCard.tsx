import { Article } from '@/types/articles';
import Image from 'next/image';
import Link from 'next/link';

const ArticleCard = ({ img, title, createdAt, text }: Article) => {
  return (
    <article className="group flex flex-col rounded-lg border border-gray-100 bg-white shadow-(--shadow-card) transition-all hover:shadow-(--shadow-article)">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="flex grow flex-col gap-y-2 p-3 leading-normal md:gap-y-2.5 md:p-4">
        <time className="text-[10px] text-[#8f8f8f]">
          {new Date(createdAt).toLocaleDateString('ru-RU')}
        </time>
        <h3 className="line-clamp-2 min-h-14 text-base font-bold text-[#414141] xl:text-lg">
          {title}
        </h3>
        <p className="mb-3 line-clamp-3 text-xs text-[#414141] xl:text-base">
          {text}
        </p>
        <Link
          href={`/articles`}
          className="mt-auto inline-flex h-10 w-37.5 cursor-pointer items-center justify-center rounded bg-[#E5FFDE] px-6 py-2 text-base text-[#70C05B] transition-colors duration-300 hover:bg-(--color-primary) hover:text-white hover:shadow-(--shadow-button-default) active:shadow-(--shadow-button-active)"
        >
          Подробнее
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
