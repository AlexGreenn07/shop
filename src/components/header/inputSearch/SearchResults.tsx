import Image from 'next/image';
import Link from 'next/link';
import iconBurger from '../../../../public/icons-header/icon-burger-menu.svg';
import { TRANSLATIONS } from '@/utils/translations';
import HighlightText from '../HighlightText';
import MiniLoader from '../../MiniLoader';
import { SearchResultsProps } from '@/types/searchResultsProps';

const SearchResults = ({
  isLoading,
  query,
  groupedProducts,
  resetSearch,
}: SearchResultsProps) => {
  if (isLoading) return <MiniLoader />;
  if (groupedProducts.length > 0)
    return (
      <div className="flex flex-col gap-2 p-2 text-[#414141]">
        {groupedProducts.map((group) => (
          <div key={group.category} className="flex flex-col gap-2">
            <Link
              href={`/category/${encodeURIComponent(group.category)}`}
              className="flex cursor-pointer justify-between gap-x-4 rounded p-1 hover:bg-gray-100"
              onClick={resetSearch}
            >
              <div className="">
                <HighlightText
                  text={
                    TRANSLATIONS[group.category] || group.category
                  }
                  highlight={query}
                />
              </div>
              <Image
                src={iconBurger}
                alt={TRANSLATIONS[group.category] || group.category}
                width={24}
                height={24}
                className="shrink-0"
              />
            </Link>
            <ul className="flex flex-col gap-2">
              {group.products.map((product) => (
                <li
                  key={product.id}
                  className="p-1 hover:bg-gray-100"
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="cursor-pointer wrap-break-word"
                    onClick={resetSearch}
                  >
                    <HighlightText
                      text={product.title}
                      highlight={query}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  if (query.length > 1) {
    return (
      <div className="px4 py-2 text-[#8f8f8f]">Ничего не найдено</div>
    );
  }

  return <div className="p-4 text-[#8f8f8f]">Введите запрос</div>;
};

export default SearchResults;
