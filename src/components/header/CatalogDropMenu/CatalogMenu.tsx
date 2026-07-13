import SearchBlock from '../SearchBlock';
import ErrorComponent from '@/components/ErrorComponent';
import MiniLoader from '@/components/MiniLoader';
import { CatalogMenuProps } from '@/types/catalogMenuProps';
import Link from 'next/link';

function CatalogMenu({
  isLoading,
  isCatalogOpen,
  categories,
  error,
  onFocusChangeAction,
  setIsCatalogOpen,
  searchBlockRef,
  menuRef,
  onMouseEnter,
}: CatalogMenuProps) {
  return (
    <>
      <div
        className="flex w-full items-center"
        onMouseEnter={onMouseEnter}
        ref={searchBlockRef}
      >
        <SearchBlock onFocusChangeAction={onFocusChangeAction} />
      </div>
      {isCatalogOpen && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 z-50 hidden w-full bg-white shadow-(--shadow-catalog-menu) md:block"
        >
          <div className="mx-auto px-4 py-3">
            {error && (
              <ErrorComponent
                error={error.error}
                userMessage={error.userMessage}
              />
            )}
            {isLoading ? (
              <MiniLoader />
            ) : categories.length > 0 ? (
              <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="text-main-text block px-4 py-2 font-bold duration-300 hover:text-[#ff6633]"
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
    </>
  );
}

export default CatalogMenu;
