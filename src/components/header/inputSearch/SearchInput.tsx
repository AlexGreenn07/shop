import Image from 'next/image';
import { SearchInputProps } from '@/types/searchInputProps';
import iconSearch from '../../../../public/icons-header/icon-search.svg';

const SearchInput = ({
  query,
  setQuery,
  handleSearch,
  handleInputBlur,
  handleInputFocus,
}: SearchInputProps) => {
  return (
    <div className="relative rounded border border-(--color-primary) leading-[150%] active:shadow-(--shadow-button-default)">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          type="text"
          value={query}
          placeholder="Найти товар"
          className="h-10 w-full rounded p-2 text-base text-[#8f8f8f] outline-none"
          onFocus={handleInputFocus}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={handleInputBlur}
        />
        <button
          type="submit"
          className="absolute top-2 right-2 h-6 w-6 cursor-pointer"
        >
          <Image
            src={iconSearch}
            alt="Поиск"
            width={24}
            height={24}
          />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
