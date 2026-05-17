'use client';

import UserBlock from './UserBlock';
import LogoBlock from './LogoBlock';
import SearchBlock from './SearchBlock';
import { useRef, useState } from 'react';
import { Categories } from '@/types/categories';
import Link from 'next/link';

function Header() {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchBlockRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const fetchCategories = async () => {
    if (categories.length > 0) return;
    try {
      setIsLoading(true);
      const response = await fetch('/api/catalog');
      const data = await response.json();
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.error('Ошибка загрузки категорий', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openMenu = () => {
    if (!isSearchFocused) {
      setIsCatalogOpen(true);
      fetchCategories();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!searchBlockRef.current || !isCatalogOpen || isSearchFocused)
      return;

    const isInsideMenu = menuRef.current?.contains(e.target as Node);
    if (isInsideMenu) return;

    const searchBlockRect =
      searchBlockRef.current.getBoundingClientRect();

    if (
      e.clientX < searchBlockRect.left ||
      e.clientX > searchBlockRect.right
    ) {
      setIsCatalogOpen(false);
    }
  };

  const handleSearchFocusAction = (focused: boolean) => {
    setIsSearchFocused(focused);
    if (focused) {
      setIsCatalogOpen(false);
    }
  };
  return (
    <header
      className="relative z-50 flex w-full flex-col justify-center bg-white md:flex-row md:gap-10 md:gap-y-5 md:p-2 md:shadow-(--shadow-default) xl:gap-y-7"
      onMouseLeave={() => setIsCatalogOpen(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="flex flex-row items-center gap-4 px-4 py-2 shadow-(--shadow-default) md:shadow-none xl:gap-10">
        <LogoBlock />
        <div
          className="flex w-full items-center"
          onMouseEnter={openMenu}
          ref={searchBlockRef}
        >
          <SearchBlock
            onFocusChangeAction={handleSearchFocusAction}
          />
        </div>
      </div>
      {isCatalogOpen && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 z-50 hidden w-full bg-white shadow-(--shadow-catalog-menu) md:block"
        >
          <div className="mx-auto px-4 py-3">
            {isLoading ? (
              <div className="py-2 text-center">Загрузка...</div>
            ) : categories.length > 0 ? (
              <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="block px-4 py-2 font-bold text-[#414141] duration-300 hover:text-[#ff6633]"
                    onClick={() => setIsCatalogOpen(false)}
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-2 text-center">
                Нет доступных категорий
              </div>
            )}
          </div>
        </div>
      )}
      <UserBlock />
    </header>
  );
}

export default Header;
