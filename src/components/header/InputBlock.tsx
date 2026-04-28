'use client';
import Image from 'next/image';
import iconSearch from '../../../public/icons-header/icon-search.svg';
import Link from 'next/link';
import iconBurger from '../../../public/icons-header/icon-burger-menu.svg';
import { useEffect, useRef, useState } from 'react';
import { SearchProduct } from '@/types/searchProduct';
import { TRANSLATIONS } from '@/utils/translations';
import HighlightText from './HighlightText';

function InputBlock() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [groupedProducts, setGroupedProducts] = useState<
    {
      category: string;
      products: SearchProduct[];
    }[]
  >([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    const fetchSearchData = async () => {
      if (query.length > 1) {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/search?query=${query}`);
          const data = await response.json();
          setGroupedProducts(data);
        } catch (error) {
          console.error('Не найден продукт или категория', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setGroupedProducts([]);
      }
    };
    const debounceTimer = setTimeout(fetchSearchData, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);
  const handleInputFocus = () => {
    setIsOpen(true);
  };
  const resetSearch = () => {
    setIsOpen(false);
    setQuery('');
  };
  return (
    <div className="relative min-w-65.25 grow" ref={searchRef}>
      <div className="relative rounded border border-(--color-primary) leading-[150%] active:shadow-(--shadow-button-default)">
        <input
          type="text"
          placeholder="Найти товар"
          className="h-10 w-full rounded p-2 text-base text-[#8f8f8f] outline-none"
          onFocus={handleInputFocus}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Image
          src={iconSearch}
          alt="Поиск"
          width={24}
          height={24}
          className="absolute top-2 right-2"
        />
      </div>
      {isOpen && (
        <div className="absolute right-0 left-0 z-10 -mt-0.5 max-h-75 overflow-y-auto rounded-b border border-t-0 border-(--color-primary) bg-white wrap-break-word shadow-inherit">
          {isLoading ? (
            <div className="p-4 text-center">Поиск...</div>
          ) : groupedProducts.length > 0 ? (
            <div className="flex flex-col gap-2 p-2">
              {groupedProducts.map((group) => (
                <div
                  key={group.category}
                  className="flex flex-col gap-2"
                >
                  <Link
                    href={`/category/${encodeURIComponent(group.category)}`}
                    className="flex cursor-pointer justify-between gap-x-4 rounded p-1 hover:bg-gray-100"
                    onClick={resetSearch}
                  >
                    <div className="">
                      <HighlightText
                        text={
                          TRANSLATIONS[group.category] ||
                          group.category
                        }
                        highlight={query}
                      />
                    </div>
                    <Image
                      src={iconBurger}
                      alt={
                        TRANSLATIONS[group.category] || group.category
                      }
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
          ) : query.length > 1 ? (
            <div className="px4 py-2 text-[#8f8f8f]">
              Ничего не найдено
            </div>
          ) : (
            <div className="p-4 text-[#8f8f8f]">Введите запрос</div>
          )}
        </div>
      )}
    </div>
  );
}

export default InputBlock;
