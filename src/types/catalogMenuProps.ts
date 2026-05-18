import { RefObject } from 'react';
import { Categories } from './categories';
import { ErrorProps } from './errorProps';

export interface CatalogMenuProps {
  isLoading: boolean;
  isCatalogOpen: boolean;
  categories: Categories[];
  error: ErrorProps | null;
  searchBlockRef: RefObject<HTMLDivElement | null>;
  menuRef: RefObject<HTMLDivElement | null>;
  onFocusChangeAction: (focused: boolean) => void;
  setIsCatalogOpen: (open: boolean) => void;
  onMouseEnter: () => void;
}
