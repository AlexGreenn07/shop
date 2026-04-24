import Link from 'next/link';
import Image from 'next/image';
import { GridCategoryBlockProps } from '@/types/categoryBlockProps';

const GridCategoryBlock = ({
  id,
  img,
  title,
}: GridCategoryBlockProps) => {
  return (
    <Link
      href={`/category-${id}`}
      className="group relative block h-full min-w-40 overflow-hidden md:min-w-56 xl:min-w-68.5"
    >
      <Image
        src={img}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />
      <div className="absolute inset-0 top-auto h-29.25 bg-[linear-gradient(180deg,rgba(112,192,91,0)_0%,rgba(112,192,91,0.3)_82.813%)] transition-all duration-300 group-hover:h-44.25 group-hover:bg-[linear-gradient(180deg,rgba(255,102,51,0)_0%,rgba(255,102,51,0.6)_100%)]"></div>
      <div className="absolute bottom-2.5 left-2.5 flex items-center">
        <span className="text-lg font-bold text-white">{title}</span>
      </div>
    </Link>
  );
};

export default GridCategoryBlock;
