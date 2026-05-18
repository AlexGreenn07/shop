export interface SearchInputProps {
  query: string;
  setQuery: (value: string) => void;
  handleSearch: () => void;
  handleInputBlur: () => void;
  handleInputFocus: () => void;
}
