'use client';

import { useEffect, useRef, useState } from 'react';
import { SearchProduct } from '@/types/searchProduct';
import { useRouter } from 'next/navigation';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

function InputBlock({
  onFocusChangeAction,
}: {
  onFocusChangeAction: (focused: boolean) => void;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
          setError('Не найден продукт или категория');
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
    onFocusChangeAction(true);
  };
  const resetSearch = () => {
    setIsOpen(false);
    setQuery('');
  };

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      resetSearch();
    }
  };

  const handleInputBlur = () => {
    onFocusChangeAction(false);
  };
  return (
    <div className="relative min-w-65.25 grow" ref={searchRef}>
      <SearchInput
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        handleInputBlur={handleInputBlur}
        handleInputFocus={handleInputFocus}
      />
      {isOpen && (
        <div className="border-primary absolute right-0 left-0 z-10 -mt-0.5 max-h-75 overflow-y-auto rounded-b border border-t-0 bg-white wrap-break-word shadow-inherit">
          {error ? (
            <div className="p-2 text-sm text-red-500">
              {error}
              <button
                onClick={() => setError(null)}
                className="cursor-pointer text-blue-500 hover:text-blue-700"
              >
                Повторить
              </button>
            </div>
          ) : (
            <SearchResults
              isLoading={isLoading}
              query={query}
              groupedProducts={groupedProducts}
              resetSearch={resetSearch}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default InputBlock;
