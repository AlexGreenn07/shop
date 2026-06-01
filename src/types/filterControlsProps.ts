export interface FilterControlsProps {
  activeFilter?: string | string[];
  basePath: string;
  searchParams: {
    page?: string;
    itemPerPage?: string;
    filter?: string | string[];
    priceFrom?: string;
    priceTo?: string;
  };
}
